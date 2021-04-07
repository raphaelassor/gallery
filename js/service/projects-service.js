var gProjs;
_createProjects();

function getProjects(){
    return gProjs
}


function _createProjects(){
    var projs=[
        _createProject('Pacman',`Let's Play Pacman`,'projects/Pacman/index.html'),
        _createProject('Minesweeper',`Mine Sweeper 1st Srpint` ,'projects/Mine-Sweeper/index.html'),
        _createProject('Touchnums',`How many Can you touch?`,'projects/Touch-Nums/num-game.html')
    ];
    gProjs=projs;
}

function _createProject(name,title,url=null){

    var proj={
        id:name.toLowerCase(),
        name,
        title,
        desc:getLoremIpsum(),
        url,
        publishedAt:null,
        labels:[]
    }
    return proj;
}
