const grid = document.querySelector('#game-grid');
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

const width = 10;
const height = 20;
let squares = [];
let currentPosition = 4;
let currentRotation = 0;
let timerId;
let score = 0;

// Tetromino shapes
const tetrominoes = [
  [1, width + 1, width * 2 + 1, 2], // L-Tetromino
  [0, width, width + 1, width * 2 + 1], // Z-Tetromino
  [1, width, width + 1, width + 2], // T-Tetromino
  [0, 1, width, width + 1], // O-Tetromino
  [1, width + 1, width * 2 + 1, width * 3 + 1], // I-Tetromino
];

let currentTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];

// Create the grid
function createGrid() {
  for (let i = 0; i < width * height; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square);
  }
  for (let i = 0; i < width; i++) {
    const square = document.createElement('div');
    square.classList.add('taken');
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

// Draw the Tetromino
function draw() {
  currentTetromino.forEach((index) => {
    squares[currentPosition + index].classList.add('tetromino');
    squares[currentPosition + index].style.backgroundColor = 'yellow';
  });
}

// Undraw the Tetromino
function undraw() {
  currentTetromino.forEach((index) => {
    squares[currentPosition + index].classList.remove('tetromino');
    squares[currentPosition + index].style.backgroundColor = '';
  });
}

// Move the Tetromino down
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// Freeze the Tetromino
function freeze() {
  if (
    currentTetromino.some(
      (index) => squares[currentPosition + index + width].classList.contains('taken')
    )
  ) {
    currentTetromino.forEach((index) =>
      squares[currentPosition + index].classList.add('taken')
    );
    // Start a new Tetromino
    currentTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    currentPosition = 4;
    draw();
    addScore();
    gameOver();
  }
}

// Move the Tetromino left
function moveLeft() {
  undraw();
  const isAtLeftEdge = currentTetromino.some(
    (index) => (currentPosition + index) % width === 0
  );
  if (!isAtLeftEdge) currentPosition -= 1;
  if (
    currentTetromino.some((index) =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    currentPosition += 1;
  }
  draw();
}

// Move the Tetromino right
function moveRight() {
  undraw();
  const isAtRightEdge = currentTetromino.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    currentTetromino.some((index) =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

// Rotate the Tetromino
function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === currentTetromino.length) {
    currentRotation = 0;
  }
  currentTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  draw();
}

// Add score
function addScore() {
  for (let i = 0; i < height; i++) {
    const row = Array.from({ length: width }, (_, j) => i * width + j);
    if (row.every((index) => squares[index].classList.contains('taken'))) {
      score += 10;
      scoreDisplay.textContent = score;
      row.forEach((index) => {
        squares[index].classList.remove('taken', 'tetromino');
        squares[index].style.backgroundColor = '';
      });
      const removedSquares = squares.splice(i * width, width);
      squares = removedSquares.concat(squares);
      squares.forEach((cell) => grid.appendChild(cell));
    }
  }
}

// Game over
function gameOver() {
  if (
    currentTetromino.some((index) =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    clearInterval(timerId);
    alert('Game Over! Your score: ' + score);
  }
}

// Controls
function control(e) {
  if (e.keyCode === 37) moveLeft();
  else if (e.keyCode === 38) rotate();
  else if (e.keyCode === 39) moveRight();
  else if (e.keyCode === 40) moveDown();
}
document.addEventListener('keydown', control);

// Start button
startButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 1000);
  }
});