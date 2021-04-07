//in - pic game




var gQuests = createQuests();
var gCurrentQuestIdx = 0;

function init() {
    renderQuestion();
}

function createQuests() {
    var gQuests = [
        { id: 1, opts: ['dog', 'cat', 'turtle', 'cow'], correctOptIdx: 1 },
        { id: 2, opts: ['man', 'woman', 'kid', 'baby'], correctOptIdx: 3 },
        { id: 3, opts: ['man', 'woman', 'notebook', 'pen'], correctOptIdx: 2 }
    ]
    return gQuests;
}

function renderOptions() {
    var strHTML = ''

    for (var i = 0; i < gQuests[0].opts.length; i++) {
        var bottom = (i + 1) * 60;
        strHTML += `<button style="${getBtnStyle()} bottom:${bottom}px;" onclick="checkAnswer(this)"
          data-optionIdx="${i}" data-questionIdx="${gCurrentQuestIdx}">${gQuests[gCurrentQuestIdx].opts[i]}</button>`
    }
    // console.log(strHTML)

    var elOptns = document.querySelector('.optn-box');
    elOptns.innerHTML = strHTML;
}

function checkAnswer(elOptn) {

    var optnIdx = elOptn.getAttribute('data-optionIDX');
    var questIdx = elOptn.getAttribute('data-questionIdx');
    optnIdx = +optnIdx;
    if (optnIdx === gQuests[questIdx].correctOptIdx) {
        if (gCurrentQuestIdx === gQuests.length - 1) openModal();
        else {
            gCurrentQuestIdx++;
            renderQuestion();
        }
    }


}

function renderQuestion() {
    renderOptions();
    renderImg();
}

function renderImg() {

    var strHTML = `<img src="imgs/${gCurrentQuestIdx}.jpg" width="700" height="500"></img> `;
    var elImg = document.querySelector('.imgBox');
    elImg.innerHTML = strHTML;
}

function getBtnStyle() {

    var strCss = `
    font-size: 16px;
    font-weight:300;
    width:250px;
    height:50px;
    background-color: lightskyblue;
    border-radius: 30px;
    border-color: transparent;
    position:absolute;
    margin-left: 50%;
    `
    return strCss;
}
function openModal() {
    document.querySelector('.modal').style.display = 'block'
}
function restart() {
    closeModal();
    gCurrentQuestIdx = 0;
    renderQuestion();
}
function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}