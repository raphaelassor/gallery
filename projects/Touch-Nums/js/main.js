//touch-num 

var gCurrNum;
var gNums;

var gMin = 0;
var gSec = 0;
var gMilSec = 0;
var gInterval = null;

function init() {
    gCurrNum = 0;
    gNums = createNums(25);
    renderTable();
}



function renderTable() {
    var nums = gNums.slice();
    shuffle(nums);
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(gNums.length); i++) {
        strHTML += `<tr>`
        for (var j = 0; j < Math.sqrt(gNums.length); j++) {
            var randNum = nums.pop();
            strHTML += `<td class="cell" onclick="checkCell(this)" data-num="${randNum}">${randNum}</td>`
        }
        strHTML += `</tr>`
    }
    var elTable = document.querySelector('table');
    elTable.innerHTML = strHTML;

}

function checkCell(cell) {

    var num = cell.getAttribute('data-num');
    num = +num;
    if (num === 1) startStopWatch();
    if (num === gCurrNum + 1) {

        console.log('equal');
        markCell(cell)
        gCurrNum++;
        if (gCurrNum === gNums.length) {
            endStopWatch();
            openModal();
        }
    }

}


function markCell(el) {
    el.classList.add('marked');
}

function createNums(size) {
    var nums = [];
    for (i = 0; i < size; i++) {
        nums.push(i + 1);
    }
    return nums;
}

function openModal() {
    document.querySelector('.modal').style.display = 'block'
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';

}

function changeSize(size) {
    gCurrNum = 0;
    gNums = createNums(size);
    renderTable();
    endStopWatch();
    resetStopWatch();
}

function reset() {
    closeModal();
    resetStopWatch();
    init();
}

function timeCycle() {
    gMilSec++;
    if (gMilSec === 1000) {
        gSec++
        gMilSec = 0;
    }
    if (gSec === 60) {
        gMin++;
        gSec = 0;
    }

    var strHTML = `${gMin}:${gSec}:${gMilSec}`;
    document.querySelector('.stopwatch').innerHTML = strHTML;


}
function startStopWatch() {
    gInterval = setInterval(timeCycle, 1);
}
function endStopWatch() {
    clearInterval(gInterval);
}
function resetStopWatch() {
    gMin = 0;
    gSec = 0;
    gMilSec = 0;
    document.querySelector('.stopwatch').innerHTML = `00:00:00`
}