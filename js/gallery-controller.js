console.log('Starting up');

$(function(){
    renderProjects();
    $('.portfolio-item a').click(onProjDetails);
    $('.offcanvas-btn').click(openCanvas);
    $('.contact-link').click(openCanvas);
    $('.btn-send-form').click(onSubmitForm);
})


function renderProjects() {
    var projs = getProjects();
    var strHtml = projs.map(function (proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" data-id="${proj.id}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.title}</h4>
          <p class="text-muted">${proj.name}</p>
        </div>
      </div>`
    }).join('');
    $('.portfolio-row').html(strHtml);
}

function renderModal(projId) {
    var projs = getProjects();
    var proj = projs.find(function (proj) {
        return proj.id === projId
    })
    var strHtml = `<h2>${proj.id}</h2>
        <p class="item-intro text-muted">${proj.title}.</p>
        <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-modal.jpg" alt="">
        <p>Use this area to describe your project.${getLoremIpsum()}!</p>
        <ul class="list-inline">
        <li>Date: </li>
        <li>Client: Threads</li>
        <li>Category: Illustration</li>
        </ul>
        <a class="btn btn-success" href="${proj.url}" target="_blank">Check it Out </a>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
            <i class="fa fa-times"></i>
            Close Project</button>`

    $('.modal-body').html(strHtml);
}

function onProjDetails(){
    var $elLink=$(this)
   var projId=$elLink.data().id;
    renderModal(projId);
}

function onSubmitForm(){
    var email=$('#email').val();
    var subject=$('#form-subject').val();
    var body=$('#form-body').val()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}.com&su=${subject}&body=${body}`,'_blank')
    document.querySelectorAll('form input,textarea').forEach(function(elInput){
        return elInput.value='';
    })
}

