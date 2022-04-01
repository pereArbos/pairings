export function attackerChoices(defenders, attackers, matrix, currentScore) {
  const choice1 = [
    matrix[defenders[0]][attackers[1][0]] + currentScore,
    currentScore + matrix[defenders[0]][attackers[1][0]],
  ];
  choice1[1] += matrix[attackers[0][0]][attackers[1][1]];
  choice1[1] += matrix[attackers[0][1]][defenders[1]];
  choice1[0] += matrix[attackers[0][1]][attackers[1][1]];
  choice1[0] += matrix[attackers[0][0]][defenders[1]];

  const choice0 = [
    matrix[defenders[0]][attackers[1][1]] + currentScore,
    currentScore + matrix[defenders[0]][attackers[1][1]],
  ];
  choice0[1] += matrix[attackers[0][0]][attackers[1][0]];
  choice0[1] += matrix[attackers[0][1]][defenders[1]];
  choice0[0] += matrix[attackers[0][1]][attackers[1][0]];
  choice0[0] += matrix[attackers[0][0]][defenders[1]];

  // choice1 = elegir primer atacante para mi escudo (attacjers[1][0])
  // choice0 = elegir el otro atacante (attacjers[1][1])

  return [choice1, choice0];
}

function getSafest(choices) {
  const worstCases = choices.map((choiceRow) => Math.min(...choiceRow));
  return Math.max(...worstCases);
}

export function discardChoices(defenders, remaining, matrix) {
  return remaining[0].map((playerToDiscard) => {
    const attackers = remaining[0].filter((item) => item !== playerToDiscard);
    return remaining[1].map((rivalDiscard) => {
      const rivalAttackers = remaining[1].filter((item) => item !== rivalDiscard);
      return getSafest(
        attackerChoices(defenders, [attackers, rivalAttackers], matrix, matrix[playerToDiscard][rivalDiscard])
      );
    });
  });
}

export function defenderChoices(remaining, matrix) {
  return remaining[0].map((defender) => {
    const others = remaining[0].filter((item) => item !== defender);
    return remaining[1].map((rivalDefender) => {
      const rivalOthers = remaining[1].filter((item) => item !== rivalDefender);
      return getSafest(discardChoices([defender, rivalDefender], [others, rivalOthers], matrix));
    });
  });
}
