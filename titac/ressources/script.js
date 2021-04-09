const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let actualPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${actualPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const actualPlayerTurn = () => `It's ${actualPlayer}'s turn`;
statusDisplay.innerHTML = actualPlayerTurn();
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = actualPlayer;
    clickedCell.innerHTML = actualPlayer;
}

function handlePlayerChange() {
    actualPlayer = actualPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = actualPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    actualPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = actualPlayerTurn();
    document.querySelectorAll('#box').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('#box').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#reset').addEventListener('click', handleRestartGame);
