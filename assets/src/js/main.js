const start = {
	//EVENTS

	functions: {

			//SMOOTHSCROLL
			smoothScroll : e => {
					console.log(e);
			},

			//SHOW NAVIGATION
			showNav : () => {
				
				($(window).scrollTop() > 40) ? (
					$(".up-arrow").addClass("is-active"), 
					$(".is-index").addClass("is-active")
				) : (
					$(".up-arrow").removeClass("is-active"),
					$(".is-index").removeClass("is-active")
				);
				
			}
		
		
	},



	events: {
		init: () => {
			const startFunctions = start.functions;

			//SMOOTHSCROLL INIT
			$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(startFunctions.smoothScroll);

			//SHOW NAVIGATION INIT
			$(window).on("scroll", startFunctions.showNav );
		}
	},

	//PLUGINS

	plugins: {
		init: () => {
			$(() => {

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
