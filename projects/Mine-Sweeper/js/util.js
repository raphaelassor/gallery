//------------- FUNCTIONS ON NUMS ----------//


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}



function drawNum2() {
    var idx = getRandomInt(0, gNums2.length)
    var num = gNums2[idx]
    gNums2.splice(idx, 1)
    return num
}










