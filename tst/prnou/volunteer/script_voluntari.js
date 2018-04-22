

function arataPacheteleMele(pachete) {
	
	var container = document.getElementById("listaPachete");
	var template = container.querySelector("#template_selectat");
	
	var children = container.querySelectorAll("tr:not(#template_selectat)");
	children.forEach(function(child) { child.remove();})
	
	for (var i = 0; i < pachete.length; i++) {
		var element = template.cloneNode(true);
		element.id = `pachet_selectat_${i}`;

		element.querySelector(".adresaPachet").innerText = pachete[i].recipient[0].address;
		element.querySelector(".taskIdInput").value = pachete[i].task_id;
		element.querySelector(".status").innerText = pachete[i].status;


		var butonAdoptaPachet = element.querySelector('input[type="button"]');
		butonAdoptaPachet.addEventListener('click', function(event) {
			renunta(event.target);
		});

		container.appendChild(element);
	}
}

function renunta(element) {
	updateStatus(element, 'Available');
}

function arataToatePachetele(pachete) {
	
	var container = document.getElementsByClassName("containerPachete")[0];
	var template = container.querySelector("#template");
	
	var children = container.querySelectorAll("tr:not(#template)");
	children.forEach(function(child) { child.remove();})
	
	for (var i = 0; i < pachete.length; i++) {
		var element = template.cloneNode(true);
		element.id = `pachet_${i}`;

		element.querySelector(".adresaPachet").innerText = pachete[i].recipient[0].address;
		element.querySelector(".taskIdInput").value = pachete[i].task_id;


		var butonAdoptaPachet = element.querySelector('.butonAdoptaPachet');
		butonAdoptaPachet.addEventListener('click', function(event) {
			adoptaPachet(event.target);
		});

		container.appendChild(element);
	}
}

function adoptaPachet(element) {
	updateStatus(element, 'Adoptat');
}

function updateStatus(element, status) {
	var form_data = new FormData(),
		items = {task_id: element.parentNode.parentNode.querySelector('.taskIdInput').value, status: status};

	for ( var key in items ) {
	    form_data.append(key, items[key]);
	}

	fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/tasks/update", {
		method: 'POST',
		body: new URLSearchParams(form_data)

	})
		.then(function(response) {
			return response.json();
		})
		.then(function() {
			getPachete();
			getPacheteleMele();
		});
}


function getPachete() {
	fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/tasks?status=Available")
		.then(function(response) {
			return response.json();
		})
		.then(arataToatePachetele);
}

function getPacheteleMele() {
	fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/tasks?volunteer_id=1")
		.then(function(response) {
			return response.json();
		})
		.then(arataPacheteleMele);
}

