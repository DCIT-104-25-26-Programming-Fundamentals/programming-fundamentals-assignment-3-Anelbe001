// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

/**
 * Reads an M x N matrix from the user, one row at a time.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @param {string} label - Label to distinguish which matrix is being entered.
 * @returns {number[][]} The matrix as an array of arrays.
 */
function readMatrix(rows, cols, label = '') {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    let row;
    // Keep asking until the row has exactly `cols` numbers
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1}${label ? ' ' + label : ''}: `);
      row = line.trim().split(/\s+/).map(Number);

      if (row.length !== cols || row.some(isNaN)) {
        console.log(`Please enter exactly ${cols} numbers separated by spaces.`);
        continue;
      }
      break;
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * Prints a matrix in a neat, aligned grid format.
 * @param {number[][]} matrix
 */
function printMatrix(matrix) {
  // Find the widest value so all columns line up
  let maxWidth = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const width = String(matrix[i][j]).length;
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j++) {
      line += String(matrix[i][j]).padStart(maxWidth + 2, ' ');
    }
    console.log(line);
  }
}

/**
 * PART A — Computes the transpose of a matrix.
 * @param {number[][]} matrix - M x N matrix.
 * @returns {number[][]} N x M transposed matrix.
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * PART B — Adds two matrices of the same size, element-wise.
 * @param {number[][]} a
 * @param {number[][]} b
 * @returns {number[][]} The element-wise sum.
 */
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * PART C — Multiplies matrix A (M x N) by matrix B (N x P).
 * @param {number[][]} a - M x N matrix.
 * @param {number[][]} b - N x P matrix.
 * @returns {number[][]} The M x P product matrix.
 */
function multiplyMatrices(a, b) {
  const m = a.length;
  const n = a[0].length;
  const p = b[0].length;
  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * Reads a positive integer dimension, re-prompting until valid.
 * @param {string} prompt
 * @returns {number}
 */
function readPositiveInt(prompt) {
  let value;
  while (true) {
    value = readlineSync.questionInt(prompt);
    if (value > 0) break;
    console.log('Please enter a positive integer.');
  }
  return value;
}

function runTranspose() {
  console.log('\n--- Transpose a Matrix ---');
  const rows = readPositiveInt('Enter number of rows: ');
  const cols = readPositiveInt('Enter number of columns: ');
  const matrix = readMatrix(rows, cols);

  console.log('\nOriginal Matrix:');
  printMatrix(matrix);

  console.log('\nTransposed Matrix:');
  printMatrix(transposeMatrix(matrix));
}

function runAddition() {
  console.log('\n--- Add Two Matrices ---');
  const rows = readPositiveInt('Enter number of rows: ');
  const cols = readPositiveInt('Enter number of columns: ');

  console.log('\nEnter Matrix A:');
  const a = readMatrix(rows, cols, '(Matrix A)');

  console.log('\nEnter Matrix B:');
  const b = readMatrix(rows, cols, '(Matrix B)');

  console.log('\nMatrix A:');
  printMatrix(a);
  console.log('\nMatrix B:');
  printMatrix(b);

  console.log('\nSum (A + B):');
  printMatrix(addMatrices(a, b));
}

function runMultiplication() {
  console.log('\n--- Multiply Two Matrices ---');
  const m = readPositiveInt('Enter rows of Matrix A: ');
  const n = readPositiveInt('Enter columns of Matrix A (= rows of Matrix B): ');
  const p = readPositiveInt('Enter columns of Matrix B: ');

  console.log('\nEnter Matrix A:');
  const a = readMatrix(m, n, '(Matrix A)');

  console.log('\nEnter Matrix B:');
  const b = readMatrix(n, p, '(Matrix B)');

  console.log('\nMatrix A:');
  printMatrix(a);
  console.log('\nMatrix B:');
  printMatrix(b);

  console.log('\nProduct (A x B):');
  printMatrix(multiplyMatrices(a, b));
}

function main() {
  console.log('Matrix Operations');
  console.log('1. Transpose a Matrix');
  console.log('2. Add Two Matrices');
  console.log('3. Multiply Two Matrices');

  const choice = readlineSync.questionInt('\nChoose an operation (1-3): ');

  switch (choice) {
    case 1:
      runTranspose();
      break;
    case 2:
      runAddition();
      break;
    case 3:
      runMultiplication();
      break;
    default:
      console.log('Invalid choice. Please run the program again and enter 1, 2, or 3.');
  }
}

main();