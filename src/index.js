var original_matrix = [];

function rowColumnValid(matrix, r, c) {
  for (var i = 0; i < 9; i++) {
    if (i != r && matrix[i][c] == matrix[r][c] || i != c && matrix[r][i] == matrix[r][c]) {
      return false;
    }
  }
  return true;
}

function boxValid(matrix, r, c) {
  var row = Math.floor(r / 3);
  var col = Math.floor(c / 3);

  for (var i = row * 3; i < row * 3 + 3; i++) {
    for (var j = col * 3; j < col * 3 + 3; j++) {
      if (i != r && j != c && matrix[i][j] == matrix[r][c]) {
        return false;
      }
    }
  }
  return true;
}

function matrixValid(matrix, r, c) {
  if (rowColumnValid(matrix, r, c) && boxValid(matrix, r, c)) {
    return true;
  }
  return false;
}

function backtrack(matrix, r, c) {
  if (c > 8) {
    c = 0;
    r++;
    if (r > 8) {
      return true;
    }
  }

  if (matrix[r][c] != 0) {
    return backtrack(matrix, r, c + 1);
  } else {
    for (var x = 1; x <= 9; x++) {
      matrix[r][c] = x;
      if (matrixValid(matrix, r, c)) {
        if (backtrack(matrix, r, c + 1)) {
          return true;
        }
      }
    }
    matrix[r][c] = 0;
    return false;
  }
}

module.exports = function solveSudoku(matrix) {
  original_matrix = matrix.map(r => [...r]);

  backtrack(matrix, 0, 0);

  return matrix;
}
