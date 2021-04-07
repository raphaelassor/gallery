'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gEatenGhosts = [];
var gIntervalGhosts;
var gGhostID;

function createGhost(board,i,j) {
    // T
    var ghost = {
        id: gGhostID++,
        color: getRandomColor(),
        location: {
            i,
            j
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    gGhostID = 0;
    createGhost(board,6,3);
    createGhost(board,5,4);
    createGhost(board,3,2);

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }


}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j

    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
       if(!gPacman.isSuper){
           gameOver();
           return
       }
       
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var color = (!gPacman.isSuper) ? ghost.color : `#FF5733`;
    return `<span class="ghost" style="color:${color}" >${GHOST}</span>`
}

function getGhostByLoc(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) return gGhosts[i];
    }
}

function removeGhost(ghost){
    for(var i=0;i<gGhosts.length;i++){
        if(gGhosts[i].id===ghost.id) {
            gGhosts.splice(i,1);
            return;
        }
    }
}