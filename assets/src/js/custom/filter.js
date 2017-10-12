const startFilter = {
	//EVENTS

	functions: {


		//PREVENT ENTER

		preventEnter: () => {
			$(window).keydown(e => {
				if (e.keyCode == 13) {
					event.preventDefault();
					return false;
				}
			});
		},

		//FILTER
		filter: () => {
			const input = $("#input"),
				filter = input.val().toUpperCase(),
				ul = $(".card-list"),
				li = $(".card-item");


			for (let i = 0; i < li.length; i++) {
				const inner = li[i].getElementsByClassName("card-inner")[0];

				if (inner.innerHTML.toUpperCase().indexOf(filter) > -1) {
					li[i].classList.remove("is-hidden");
				}
				else {
					li[i].classList.add("is-hidden");
				}
			}

			startFilter.functions.preventEnter();
		},

		cleanField: e => {
			e.preventDefault();
			$(".card-item").removeClass("is-hidden");
			$(".searchInput").val("");
		}

	},


	//EVENTS
	events: {
		init: () => {

			$(() => {
				const startFunctions = startFilter.functions;


				//FILTER
				$(".searchField").on("keyup", startFunctions.filter);

				//CLEANFIELD
				$(".cleanButton").on("click", startFunctions.cleanField);

			});



		}
	},



	//INIT OBJECT

	init: () => {
		startFilter.events.init();


	}
};


//INIT OBJECTS

startFilter.init();
