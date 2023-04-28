export const generalMatrix = {
  GI: [3, 4, 2, 4, 5, 5],
  CUS: [6, 5, 6, 5, 5, 3],
  IK: [5, 3, 4, 6, 5, 5],
  IH: [3, 4, 3, 4, 5, 4],
  DA: [5, 4, 4, 4, 5, 3],
  BA: [5, 5, 6, 5, 6, 3],
  SAL: [3, 5, 3, 4, 4, 4],
  DEM: [3, 4, 3, 2, 3, 5],
  TS: [4, 5, 4, 5, 3, 4],
  WE: [4, 4, 4, 4, 4, 2],
  ELD: [5, 5, 3, 3, 4, 3],
  GSC: [4, 4, 4, 4, 4, 5],
  ORK: [5, 2, 3, 3, 3, 5],
  TAU: [6, 6, 3, 4, 6, 4],
  LOV: [4, 5, 6, 4, 4, 5],
};

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
