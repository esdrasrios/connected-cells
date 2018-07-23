'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the connectedCell function below.
const connectedCell = matrix => {
  let maxConnCells = 0;
  let curConnCells = 0;
  
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 1) {
        curConnCells = 1;
        maxConnCells = Math.max(maxConnCells, hasAdjacents(matrix, r, c, curConnCells));
      }
    }
  }
  return maxConnCells;
};

const safeCheck = (matrix, r, c) => {
  return !(
    r < 0 ||
    r >= matrix.length ||
    c < 0 ||
    c >= matrix[r].length ||
    matrix[r][c] === 0
  );
};

const hasAdjacents = (matrix, r, c, curConnCells) => {
  const rows = [0, 1, 1, 1, 0, 1, -1, -1];
  const cols = [1, 1, 0, -1, -1, -1, 0, 0];

  matrix[r][c] = 0;

  for (let i = 0; i < rows.length; i++) {
    if (safeCheck(matrix, r + rows[i], c + cols[i])) {
      curConnCells++;
      curConnCells = hasAdjacents(matrix, r + rows[i], c + cols[i], curConnCells);
    }
  }
  return curConnCells;
};

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const n = parseInt(readLine(), 10);
    const m = parseInt(readLine(), 10);
    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
        matrix[i] = readLine().split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    let result = connectedCell(matrix);
    ws.write(result + "\n");
    ws.end();
}
