// payoffBimatrix is symmetric

export function isPSNE(
  payoffBimatrix: number[][][],
  row: number,
  col: number,
): boolean {
  const rowPlayerPayoff = payoffBimatrix[row][col][0];
  const colPlayerPayoff = payoffBimatrix[row][col][1];

  // row player must have no better choice for given col
  for (let i = 0; i < payoffBimatrix.length; i++) {
    if (i === row) {
      continue;
    }
    if (rowPlayerPayoff < payoffBimatrix[i][col][0]) {
      return false;
    }
  }

  // col player must have no better choice for given row
  for (let j = 0; j < payoffBimatrix.length; j++) {
    if (j === col) {
      continue;
    }
    if (colPlayerPayoff < payoffBimatrix[row][j][1]) {
      return false;
    }
  }

  return true; // Nash Equilibrium
}

export function isDominantStrategy(
  payoffBimatrix: number[][][],
  rowIndex: number | null,
  colIndex: number | null,
): boolean {
  if (rowIndex !== null) {
    return isDominantRow(payoffBimatrix, rowIndex);
  }
  if (colIndex !== null) {
    return isDominantCol(payoffBimatrix, colIndex);
  }
  return false;
}

function isDominantRow(
  payoffBimatrix: number[][][],
  rowIndex: number,
): boolean {
  // for each value in row, check that it is greater than values in other cols
  for (let col = 0; col < payoffBimatrix.length; col++) {
    for (let i = 0; i < payoffBimatrix.length; i++) {
      if (i === rowIndex) {
        // dont check same row
        continue;
      }
      if (payoffBimatrix[i][col][0] >= payoffBimatrix[rowIndex][col][0]) {
        // found a payoff as good if not better in another row
        return false;
      }
    }
  }
  return true;
}

function isDominantCol(
  payoffBimatrix: number[][][],
  colIndex: number,
): boolean {
  // for each value in col, check that it is greater than values in other rows
  for (let row = 0; row < payoffBimatrix.length; row++) {
    for (let j = 0; j < payoffBimatrix.length; j++) {
      if (j === colIndex) {
        // dont check same col
        continue;
      }
      if (payoffBimatrix[row][j][1] >= payoffBimatrix[row][colIndex][1]) {
        // found a payoff as good if not better in another col
        return false;
      }
    }
  }
  return true;
}

// Checks that the row player is best responding given that the column players choice is fixed
export function isRowPlayerBestResponse(
  payoffBimatrix: number[][][],
  rowIndex: number,
  colIndex: number,
) {
  const rowPlayerPayoff = payoffBimatrix[rowIndex][colIndex][0];

  // row player must have no better choice for given col
  for (let i = 0; i < payoffBimatrix.length; i++) {
    if (i === rowIndex) {
      continue;
    }
    if (rowPlayerPayoff < payoffBimatrix[i][colIndex][0]) {
      return false;
    }
  }

  return true;
}
