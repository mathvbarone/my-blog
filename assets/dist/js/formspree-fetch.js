document.addEventListener('DOMContentLoaded', function() {
	var contactForm = document.getElementById('contact-form');
	
	contactForm.addEventListener('submit', function(event) {
		event.preventDefault()

		var msgLoad = '<div class="alert alert--loading">Sending message…</div>';
		var msgSuccess = '<div class="alert alert--success">Message sent!</div>';
		var msgError = '<div class="alert alert--error">Ops, there was an error.</div>';

		var updateMsg = function(nodes, msg) {
			var statusMessages = document.querySelectorAll('.alert--loading')
			for (i = 0; i < statusMessages.length; i++) {
				statusMessages[i].style.display = 'none'
			}
			nodes.insertAdjacentHTML('beforeend', msg);
		}

		updateMsg(contactForm, msgLoad);
		fetch('https://formspree.io/matheusvbarone@gmail.com', {
			method: 'POST',
			mode: 'cors',
			body: new FormData(contactForm)
		}).then(function(response) {
			if (!response.ok) {
				updateMsg(contactForm, msgError);
				return Promise.reject(new Error(response.statusText))
			}
			updateMsg(contactForm, msgSuccess);
			return Promise.resolve(response)
		}).catch(function(error) {
			updateMsg(contactForm, msgError);
		});
	});
});
