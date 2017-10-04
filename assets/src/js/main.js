$(document).ready(function() {

  //FUNÇÃO DE SCROLL
  $(function() {
    // SELECIONA TODOS OS LINKS COM HASHTAG
    $('a[href*="#"]')
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // LINKS NA PÁGINA
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          // DESCOBRE QUAL ELEMENTO VAI SCROLLAR
          var target = $(this.hash);
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");
          // VE SE EXISTE O ALVO
          if (target.length) {           
            event.preventDefault();

            $("html, body").animate(
              {
                scrollTop: target.offset().top
              },
              600,
              function() {
                //CALLBACK
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                  //CHECA SE O TARGET TA FOCUS
                  return false;
                } else {
                  $target.attr("tabindex", "-1"); // ADICIONA TABLEINDEX SE O ELEMENTO NAO PUDER TER FOUS
                  $target.focus(); // SETA O FOCUS DE NOVO
                }
              }
            );
          }
        }
      });
  });


  //PREVENT ENTER
var preventEnter = function(){
  $(window).keydown(function(e){
    if(e.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
}


// FILTRO
var postFilter = function(){

  //DECLARANDO VARIÁVEIS
  var input, filter, ul, li, cleanButton, inner;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  ul = document.getElementsByClassName("card-list");
  li = document.getElementsByClassName("card-item");
  cleanButton = document.getElementsByClassName("button-clean");


  //LOOP NA LI PARA RENDERIZAR OS USUÁRIOS
  for (var i = 0; i < li.length; i++) {
      inner = li[i].getElementsByClassName("card-inner")[0];
      if (inner.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].classList.remove("is-hidden");
      } else {;
          li[i].classList.add("is-hidden");
      }
  }

  preventEnter();

}





$(function() {
  var $contactForm = $('#contact-form');


	$contactForm.on('submit', function(e) {
    e.preventDefault();

    
    var msgLoad = '<div class="alert is-loading">Is loading</div>';


    var showMessage = function(message){
      
      if(message == "success"){
        var modalText = 'Mensagem enviada!';
        var ajaxStatus = "success";
      }
      if(message == "error"){
        var modalText = 'Ocorreu um erro :/';
        varajaxStatus = "error";
      }

      var modalBox = '<div class="modal alert is-'+ajaxStatus+' is-active"><div class="modal-background"></div><div class="modal-content"><div class="box">'+modalText+'</div></div><div class="modal-close is-large" aria-label="close"></div></div>'
      
      $contactForm.append(modalBox);
    }


		$.ajax({
			url: 'https://formspree.io/matheusvbarone@gmail.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				$contactForm.append(msgLoad);
			}
		}).done(function(data) {
      showMessage("success");
        $(".modal-close, .modal-background").on("click", function(){
          $(".modal").removeClass("is-active");
        }) 
		}).fail(function() {
			showMessage("error");
		}).always(function() {
			$contactForm.find('.is-loading').hide();
    });

  });



});





  // BOTÃO QUE LIMPA O INPUT
  var cleanField = function(e){
    e.preventDefault();
    $(".card-item").removeClass("is-hidden");
    $(".searchInput").val("");
  }


  //FUNÇAO DE CHAMADA DO ANIMATION
  $(function() {
    wow = new WOW({
      mobile: true
    });
    wow.init();
  });


  //EFEITO DE PARALLAX NO CONTEUDO DO HEADER
  var scrollBanner = function () {
    var headerContent = $(".hero-body");
    var headerContentHeight = headerContent.height();
    var scrollPos = window.scrollY;

    if (scrollPos <= headerContentHeight) {
      headerContent.css(
        "transform",
        "translateY(" + -scrollPos / 2 + "px" + ")"
      );
      headerContent.css("opacity", 1 - scrollPos / headerContentHeight);
    }
  }
 
  var showHeader = function() {
      if($(window).scrollTop() > 40){
        $(".index-header").addClass("is-active");
      }
      else{
        $(".index-header").removeClass("is-active");
      }
  }


  var showArrow = function() {
    if($(window).scrollTop() > 40){
      $(".up-arrow").addClass("is-active");
    }
    else{
      $(".up-arrow").removeClass("is-active");
    }
}



  var typeScript = function(){
    Typed.new('#typed', {
      stringsElement: document.getElementById('typed-strings'),
      loop:true
    });
  }


  //CALLBACKS
  typeScript();
  $(window).on("scroll", scrollBanner );
  $(window).on("scroll", showHeader );
  $(window).on("scroll", showArrow );
  $(".searchField").on("keyup", postFilter );
  $(".cleanButton").on("click", cleanField);
});


  //TARGET BLANK

(function() {
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
      links[i].className += ' externalLink';
    }
  }
})();

