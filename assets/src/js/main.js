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

		//SMOOTHSCROLL
		smoothScroll: function (e) {
			if (
				location.pathname.replace(/^\//, "") ==
				this.pathname.replace(/^\//, "") &&
				location.hostname == this.hostname
			) {
				let target = $(this.hash);
				target = target.length
					? target
					: $(`[name=${this.hash.slice(1)}]`);
				if (target.length) {
					e.preventDefault();

					$("html, body").animate(
						{
							scrollTop: target.offset().top
						},
						600,
						 () => {
							let $target = $(target);
							$target.focus();
							if ($target.is(":focus")) {
								return false;
							} else {
								$target.attr("tabindex", "-1"); 
								$target.focus(); 
							}
						}
					);
				}
			}
		},


	},



	events: {
		init: () => {

			$(() => {
				const starting = start.functions;
				const allowedLiks = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');

				//SHOW NAVIGATION INIT
				$(window).on("scroll", starting.showNav);

				//SMOOTHSCROLL INIT
				allowedLiks.on("click", starting.smoothScroll);

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


//INIT OBJECTS

start.init();
