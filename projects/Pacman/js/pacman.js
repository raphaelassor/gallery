'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false,
        currCellContent:EMPTY
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // var isSuperOnSuperfood=false;


    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            renderCell(gPacman.location, EMPTY)
            gameOver()
            return
        }
        else {
            var eatenGhost = getGhostByLoc(nextLocation)
            removeGhost(eatenGhost);
            gEatenGhosts.push(eatenGhost);
            if (eatenGhost.currCellContent === FOOD || eatenGhost.currCellContent === SUPERFOOD) {
                gFoodCount--;
                updateScore(1)
                eatenGhost.currCellContent = EMPTY;

            }
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--;
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] =gPacman.currCellContent
        // update the DOM
        renderCell(gPacman.location,gPacman.currCellContent)

    if (nextCell === SUPERFOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true;
            updateScore(1)
            gFoodCount--;
           
            setTimeout(cancelSuperMode, 5000);
        }
        else gPacman.currCellContent=SUPERFOOD

    }

   
    if(!(nextCell===SUPERFOOD &&gPacman.isSuper)){
        gPacman.currCellContent=EMPTY;
    }

    // Move the pacman
    // update the model

    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the DOM
    renderCell(gPacman.location, PACMAN);
    if (!gFoodCount) gameOver();
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}

function cancelSuperMode() {
    gPacman.isSuper = false;
    for (var i = 0; i < gEatenGhosts.length; i++) {
        gGhosts.push(gEatenGhosts[i]);
    }
    gEatenGhosts = [];
}