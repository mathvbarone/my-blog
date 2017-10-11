const start = {
  //EVENTS

  events: {
    init: () => {
      console.log("1");
    }
  },

  //PLUGINS

  plugins: {
    init: () => {
      $(function() {

        //WOW
        const notAndroid = !/Android/i.test(navigator.userAgent);
        if(notAndroid) {
          const wow = new WOW({
               mobile: true
          });
          wow.init();
        }

        //TYPESCRIPT
        const typeScript = (() =>{
          Typed.new('#typed', {
               stringsElement: document.getElementById('typed-strings'),
               loop:true,
               typeSpeed: 60
          });
        })();
        
      });
    }
  },

  //FORMS
  forms: {
    init: () => {
      console.log("3");
    }
  },

  //INIT OBJECT

  init: () => {
    start.events.init();

    start.plugins.init();

    start.forms.init();
  }
};

// /START

//INIT OBJECTS

start.init();
