export function getAverage(matrix) {
  const numPlayers = matrix.length;
  const list = [...Array(numPlayers).keys()];
  const permutations = permutator(list);

  let result = 0;
  permutations.forEach((item) => {
    matrix.forEach((row, idx) => {
      result += row[item[idx]];
    });
  });

  return result / permutations.length;
}

function permutator(inputArr) {
  let result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
}
