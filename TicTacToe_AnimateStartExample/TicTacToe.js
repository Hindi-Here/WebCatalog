let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.TicTacToe-cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('game-reset').addEventListener('click', resetGame);
});

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const cellIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);

    if (gameBoard[cellIndex]!== '') return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    checkForWin();
    checkForDraw();

    currentPlayer = currentPlayer === 'X'? 'O' : 'X';
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            document.getElementById('game-result').textContent = `Игрок ${gameBoard[a]} победил!`;
            return;
        }
    }
}

function checkForDraw() {
    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('game-result').textContent = 'Ничья...';
    }
}

function resetGame() {
    gameOver = false;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.TicTacToe-cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    document.getElementById('game-result').textContent = '';
}