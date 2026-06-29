const board = document.querySelector(".board");
const restartButton = document.querySelector("#restartButton");
const winningMessage = document.querySelector("#winningMessage");

let turn = "O";
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

let gameState = new Array(9).fill("E");

function checkWinner() {
    for (let [a, b, c] of winningCombinations) {
        if (
            gameState[a] !== "E" &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        ) {
            return gameState[a];
        }
    }

    return null;
}

function checkDraw() {
    return !gameState.includes("E");
}

board.addEventListener("click", (e) => {
    if (gameOver) return;

    if (!e.target.classList.contains("cell")) return;

    const cell = e.target;
    const index = Number(cell.id);

    if (gameState[index] !== "E") return;

    gameState[index] = turn;
    cell.textContent = turn;

    const winner = checkWinner();

    if (winner) {
        winningMessage.textContent = `${winner} Wins! 🎉`;
        gameOver = true;
        return;
    }

    if (checkDraw()) {
        winningMessage.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    turn = turn === "O" ? "X" : "O";
});

restartButton.addEventListener("click", () => {
    gameState = new Array(9).fill("E");
    turn = "O";
    gameOver = false;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
    });

    winningMessage.textContent = "";
});