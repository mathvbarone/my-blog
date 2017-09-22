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



// FILTRO
var postFilter = function(){
  //DECLARANDO VARIÁVEIS
  var input, filter, ul, li, searchButton, inner;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  ul = document.getElementsByClassName("card-list");
  li = document.getElementsByClassName("card-item");
  searchButton = document.getElementsByClassName("button-clean");


  //LOOP NA LI PARA RENDERIZAR OS USUÁRIOS
  for (var i = 0; i < li.length; i++) {
      inner = li[i].getElementsByClassName("card-inner")[0];
      if (inner.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].classList.remove("is-hidden");
      } else {;
          li[i].classList.add("is-hidden");
      }
  }

  // BOTÃO QUE LIMPA O INPUT
  // searchButton.addEventListener("click", function() {
  //     $(".user-list-item").removeClass("hide");
  //     input.value = "";
  // });
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
    var headerContent = $(".hero-index-body");
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
      if($(this).scrollTop() > 40){
        $(".index-header").addClass("is-active");
      }
      else{
        $(".index-header").removeClass("is-active");
      }
  }


// SCROLLIFY
  var scrollify = function() {
    $.scrollify({
      section : ".panel",
      scrollSpeed: 1100,
    })
  }


  var typeScript = function(){
    Typed.new('#typed', {
      stringsElement: document.getElementById('typed-strings'),
      loop:true
    });
  }

  // scrollify();
  typeScript();
  window.addEventListener("scroll", scrollBanner );
  window.addEventListener("scroll",  showHeader );
  $(".form").on("keyup", postFilter );


});


  

