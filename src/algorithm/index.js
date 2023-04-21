export function attackerPairing(defenders, attackers, matrix, score = 0) {
  const choice1 = [matrix[defenders[0]][attackers[1][0]] + score, matrix[defenders[0]][attackers[1][0]] + score];
  choice1[1] += matrix[attackers[0][0]][attackers[1][1]];
  choice1[1] += matrix[attackers[0][1]][defenders[1]];
  choice1[0] += matrix[attackers[0][1]][attackers[1][1]];
  choice1[0] += matrix[attackers[0][0]][defenders[1]];

  const choice0 = [matrix[defenders[0]][attackers[1][1]] + score, matrix[defenders[0]][attackers[1][1]] + score];
  choice0[1] += matrix[attackers[0][0]][attackers[1][0]];
  choice0[1] += matrix[attackers[0][1]][defenders[1]];
  choice0[0] += matrix[attackers[0][1]][attackers[1][0]];
  choice0[0] += matrix[attackers[0][0]][defenders[1]];

  // choice1 = elegir primer atacante para mi escudo (attacjers[1][0])
  // choice0 = elegir el otro atacante (attacjers[1][1])

  return [choice1, choice0];
}

export function defenderChoices(remaining, matrix, last, score, useSum) {
  return remaining[0].map((defender) => {
    const others = remaining[0].filter((item) => item !== defender);
    return remaining[1].map((rivalDefender) => {
      const rivalOthers = remaining[1].filter((item) => item !== rivalDefender);
      const nextStep = last ? attackerPairing : attackerChoices;
      const metric = useSum ? getSumm : getSafest;
      return metric(nextStep([defender, rivalDefender], [others, rivalOthers], matrix, score));
    });
  });
}

export function getPairs(list) {
  return list.flatMap((v, i) => list.slice(i + 1).map((w) => [v, w]));
}

export function attackerChoices(defenders, remaining, matrix) {
  const teamPairs = getPairs(remaining[0]);
  const rivalPairs = getPairs(remaining[1]);

  return teamPairs.map((attackers) => {
    const others = remaining[0].filter((item) => !attackers.includes(item));
    return rivalPairs.map((rivalAttackers) => {
      const rivalOthers = remaining[1].filter((item) => !rivalAttackers.includes(item));
      return (
        getSafest(attackerPairing(defenders, [attackers, rivalAttackers], matrix)) +
        getSafest(defenderChoices([others, rivalOthers], matrix, true))
      );
    });
  });
}

function getSafest(choices) {
  const worstCases = choices.map((choiceRow) => Math.min(...choiceRow));
  return Math.max(...worstCases);
}

function getSumm(choices) {
  let sum = 0;
  choices.forEach((row) => {
    row.forEach((item) => {
      sum += item;
    });
  });
  return sum;
}

export function solveGame(choices) {
  const choiceIdxs = [...Array(choices.length).keys()];
  const filtered = choiceIdxs.filter((i) => !isOutclassed(choices[i], choices));
  console.log(filtered);
}

function isOutclassed(row, matrix) {
  let outClassed = false;
  matrix.forEach((row2) => {
    let noneLower = true;
    let allEqual = true;
    row2.forEach((value, idx) => {
      if (value < row[idx]) noneLower = false;
      if (value !== row[idx]) allEqual = false;
    });
    if (noneLower && !allEqual) outClassed = true;
  });
  return outClassed;
}

export function discardChoices(defenders, remaining, matrix) {
  return remaining[0].map((playerToDiscard) => {
    const attackers = remaining[0].filter((item) => item !== playerToDiscard);
    return remaining[1].map((rivalDiscard) => {
      const rivalAttackers = remaining[1].filter((item) => item !== rivalDiscard);
      return getSafest(
        attackerPairing(defenders, [attackers, rivalAttackers], matrix, matrix[playerToDiscard][rivalDiscard])
      );
    });
  });
}
