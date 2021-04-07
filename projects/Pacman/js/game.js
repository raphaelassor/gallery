'use strict'
const WALL = '#'
const FOOD = '.'
const SUPERFOOD = `&#x2022`;
const EMPTY = ' ';

var gFoodCount;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gFoodCount = countFood()
    console.log(gFoodCount,'gfoodcount ');
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }

        }
    }
    //add super food
    board[1][1] = SUPERFOOD
    board[board.length - 2][1] = SUPERFOOD
    board[1][board[0].length - 2] = SUPERFOOD
    board[board.length - 2][board[0].length - 2] = SUPERFOOD
    return board;

}



function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null
    openModal();
    //TODO: create isWin variable to enter the game immediately if lost or won. 
}

function countFood() {

    var foodCount = 0;
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] === FOOD ||gBoard[i][j] ===  SUPERFOOD) foodCount++
        }
    }
    
    return foodCount+3;
}

function openModal() {
    document.querySelector(".modal").style.display = 'block';
    if (!gFoodCount) document.querySelector(".modal span").innerText = 'You Won the Game!';
    else document.querySelector(".modal span").innerText = 'Game Over !!';
}

function restart() {
    document.querySelector(".modal").style.display = 'none';
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    init();
}
