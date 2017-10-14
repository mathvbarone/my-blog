const start = {
	//EVENTS

	functions: {

		//SHOW NAVIGATION
		showNav: () => {

			($(window).scrollTop() > 40) ? (
				$(".up-arrow").addClass("is-active"),
				$(".is-index").addClass("is-active")
			) : (
					$(".up-arrow").removeClass("is-active"),
					$(".is-index").removeClass("is-active")
				);
		},

	},

	//EVENTS
	events: {
		init: () => {

			$(() => {
				const startFunctions = start.functions;

				//SHOW NAVIGATION INIT
				$(window).on("scroll", startFunctions.showNav);


			});



		}
	},

	//PLUGINS

	plugins: {
		init: () => {
			$(() => {

				//WOW
				const notAndroid = !/Android/i.test(navigator.userAgent);
				if (notAndroid) {
					const wow = new WOW({
						mobile: true
					});
					wow.init();
				}

				//TYPESCRIPT
				const typeScript = (() => {
					Typed.new('#typed', {
						stringsElement: document.getElementById('typed-strings'),
						loop: true,
						typeSpeed: 60
					});
				})();



			});
		}
	},


	//INIT OBJECT

	init: () => {
		start.events.init();

		start.plugins.init();

	}
};


//INIT OBJECTS

start.init();
