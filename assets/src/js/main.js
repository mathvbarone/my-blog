$(document).ready(function() {


var notAndroid = !/Android/i.test(navigator.userAgent);



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





  var contactForm = $('#contact-form');
  var contact = $(".contact-box");

  var sendForm = function(e){
    e.preventDefault();
    
    
        var showMessage = function(message){
          
          if(message == "loading"){
            var messageText = '<figure class="is-loading-img"><svg width="66px"  height="66px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring" style="background: none;"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="40" stroke-width="5" stroke="#fff" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(258 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}" ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" stroke-linecap="round" r="34" stroke-width="5" stroke="#2ab7cd" stroke-dasharray="53.40707511102649 53.40707511102649" stroke-dashoffset="53.40707511102649" transform="rotate(-258 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg><figure>';
            var ajaxStatus = "loading";
          }
          
          if(message == "success"){
            var messageText = '<div class="success-box"><svg class="checkmark checkmark-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><strong>Sua mensagem foi enviada!</strong><div class="column is-narrow has-text-centered"><button type="button" title="retornar" class="button button-custom has-text-centered is-info form-return">Retornar</button></div>';
            var ajaxStatus = "success";
          }
          if(message == "error"){
            var messageText = '<div class="error-box"><svg class="checkmark  checkmark-error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M16 16 36 36 M36 16 16 36"/></svg><strong>Ocorreu um erro :( <br/> Tente novamente mais tarde</strong><div class="column is-narrow has-text-centered"><button type="button" title="retornar" class="button button-custom has-text-centered is-info form-return">Retornar</button></div>';
            
            varajaxStatus = "error";
          }
    
          var messageBox = '<div class="message-alert"><div class="is-'+ajaxStatus+'">'+messageText+'</div></div></div>'
          
          contact.append(messageBox);
      
        }


    
        $.ajax({
          url: '//formspree.io/matheusvbarone@gmail.com',
          method: 'POST',
          data: $(this).serialize(),
          dataType: 'json',
          beforeSend: function() {
            contactForm.hide();
            showMessage("loading");
          }
        }).done(function(data) {          
          showMessage("success");          
        }).fail(function() {
          showMessage("error");
        }).always(function() {
          contact.find('.is-loading').hide();  

          $(".form-return").on("click", function(e){
            e.preventDefault();
            $('.message-alert').hide();
            contactForm.show();
            $(".valid").val("");
            
          })    

        });


  }




  // BOTÃO QUE LIMPA O INPUT
  var cleanField = function(e){
    e.preventDefault();
    $(".card-item").removeClass("is-hidden");
    $(".searchInput").val("");
  }


  //FUNÇAO DE CHAMADA DO ANIMATION

  if(notAndroid) { 
    $(function() {
      wow = new WOW({
        mobile: true
      });
      wow.init();
    });
 }



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
        $(".is-index").addClass("is-active");
      }
      else{
        $(".is-index").removeClass("is-active");
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
      loop:true,
      typeSpeed: 60
    });
  }


  //CALLBACKS
  typeScript();
  $(window).on("scroll", scrollBanner );
  $(window).on("scroll", showHeader );
  $(window).on("scroll", showArrow );
  $(".searchField").on("keyup", postFilter );
  $(".cleanButton").on("click", cleanField);
	contactForm.on('submit', sendForm);
});


  //TARGET BLANK

(function() {
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != (window.location.hostname)) {
      links[i].target = '_blank';
      links[i].className += ' externalLink';
    }
  }
  console.log(window.location.hostname);
})();

