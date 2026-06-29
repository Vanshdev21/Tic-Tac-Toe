const board = document.querySelector('.board');
const btn = document.querySelector("#restartButton");
const p = document.querySelector("#winningMessage");

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

let boardArr = new Array(9).fill("E");
let gameFinish = false;
function winningCondition() {
    for (const [a,b,c] of winningCombinations) {
        if (boardArr[a] !== "E" && boardArr[a] === boardArr[b] && boardArr[a] === boardArr[c]) {
            gameFinish = true;
            return 1;
        }
    }
    return 0;
}

function drawCondition() {
    if (!boardArr.includes("E")) {
        gameFinish = true;
        return 1;
    }
}

let turn = "O";

const removeAll = ()=>{
    boardArr = new Array(9).fill("E");
    turn = "O";
    p.textContent = "";
    gameFinish = false;
    const arr = [...board.children];
    arr.forEach(cell=>{
        cell.textContent = "";
    })
    
}

board.addEventListener('click',(e)=>{

    
    if (e.target.className === "cell") {
        if (gameFinish || e.target.textContent !== "") {
            return;
        }
        if (turn === "O") {
            e.target.textContent = turn;
            let index = e.target.id;
            boardArr[index] = turn;
            turn = "X";
            if (winningCondition()) {
                p.textContent = "O won";
            }
            else if (drawCondition()) {
                p.textContent = "Draw";
                setTimeout(() => {
                    removeAll();
                }, 2000);
            }
        } else{
            e.target.textContent = turn;
            let index = e.target.id;
            boardArr[index] = turn;
            turn = "O";
            if (winningCondition()) {
                p.textContent = "X won";
            }
            else if (drawCondition()) {
                p.textContent = "Draw";
                setTimeout(() => {
                    removeAll();
                }, 2000);
            }
        }
    }
})



btn.addEventListener('click',removeAll)