function hideLoadingModal() {
  document.getElementById("loadingModal").classList = ["loadingModalHidden"];
}

function showLoadingModal() {
  document.getElementById("loadingModal").classList = ["loadingModalShown"];
}

function hideEditModal() {
  document.getElementById("editModal").classList = ["editModalHidden"];
}

function showEditModal() {
  document.getElementById("editModal").classList = ["editModalShown"];
}

function menuOnMouseOver() {
  document.getElementById("imgDiv").querySelector("img").src =
    "menu_icon_h.png";
}

function menuOnMouseOut() {
  document.getElementById("imgDiv").querySelector("img").src = "menu_icon.png";
}

function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("shown");
  } else {
    menu.classList.remove("shown");
    menu.classList.add("hidden");
  }
}



function login(){
  window.location = "actiune.html";
}

function draw() {
	var tabel = document.getElementById("famList");
	var str = "";
	for(var i = 0; i<famList.length; i++) {
		var rand = `<ul>
						<li class="famItem">
							<span class="nume">${famList[i].name}</span>
							<input type="button" value="View/Edit" onclick="openEditor(${i})" class="button-small"><span class="status ${famList[i].status}">
						</li>						
					</ul>`
		str += rand;
	}
	tabel.innerHTML = str;
	colete();
	drawMap();
}

function openEditor(i){
	populateLoadingModal(i);
	showEditModal();
}

function populateLoadingModal(index){
    document.getElementById("name").value = famList[index].name;
    document.getElementById("address").value = famList[index].address;
    document.getElementById("details").value = famList[index].details;
    document.getElementById("status").innerHTML = famList[index].status;
    document.getElementById("idHidden").value = index;
}

function saveDetails(){
    var index = document.getElementById("idHidden").value
    famList[index].name = document.getElementById("name").value;
    famList[index].address = document.getElementById("address").value;
    famList[index].details = document.getElementById("details").value;
    draw();
    hideEditModal();
}

function deleteDetails(index) {
	var index = document.getElementById("idHidden").value
	famList.splice(index,1);
	draw();
	hideEditModal();
		
}

function colete() {
	document.getElementById("nrColete").innerHTML = famList.filter((a)=>{return a.status === "Adopted";}).length +"/"+ famList.length;
}

function sorteaza() {
	famList = famList.sort((a,b)=>{
		if(a.status === "Adopted")
			return 1;
		else
			return 0;
	});
	draw();
}

function adauga() {
	famList.push({
	"name": null,
    "address": null,
    "status": "Unassigned",
    "details": null,
	});

	populateLoadingModal(famList.length - 1);
	showEditModal();


}

var famList = [
  {
    "name": "Familie Defavorizata 1",
    "address": "Cluj-Napoca, str. Henri Barbusse",
    "status": "Adopted",
    "details": "Numar copii: 1. Intoleranta la gluten",
    "volunteer": {
      "name": "Voluntar 1",
      "contactNumber": "+0740123456"
    }
  },
  {
    "name": "Familie Defavorizata 2",
    "address": "Cluj-Napoca, str. Henri Barbusse",
    "status": "Unassigned",
    "details": "Numar copii: 3",
    "volunteer": {}
  },
  {
    "name": "Familie Defavorizata 3",
    "address": "Cluj-Napoca, str. Henri Barbusse",
    "status": "Adopted",
    "details": "Numar copii: 5. Intoleranta la gluten",
    "volunteer": {
      "name": "Voluntar 1",
      "contactNumber": "+0740123456"
    }
 }
]

volunteerList = [
  {
    lat:44.4379853,
    lon:25.9545534,
    name:"V1"
  },
  {
    lat:45.4379853,
    lon:23.9545534,
    name:"V2"
  },
  {
    lat:44.4379853,
    lon:26.9545534,
    name:"V3"
  }

];

needsList = [
  {
    lat:46.4379853,
    lon:25.9545534,
    name:"N1"
  },
  {
    lat:42.4379853,
    lon:23.9545534,
    name:"N2"
  },
  {
    lat:43.4379853,
    lon:27.9545534,
    name:"N3"
  }
];

function initMap() {
  var myLatLng = {
                  lat: 44.4379853, 
                  lng: 25.9545534
                };
  
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            myLatLng.lat=position.coords.latitude;
            myLatLng.lng=position.coords.longitude;
          });
  } 
          

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: myLatLng
  });

  drawMap();
}


function drawMap(){

	for(var i in volunteerList){
	  var marker = new google.maps.Marker({
	    position: {lat:volunteerList[i].lat,
	               lng:volunteerList[i].lon},
	    map: map,
	    title: volunteerList[i].name,
	    icon:'http://maps.google.com/mapfiles/kml/pal4/icon62.png'
	  });

	}
	for(var i in needsList){
	  var marker = new google.maps.Marker({
	    position: {lat:needsList[i].lat,
	               lng:needsList[i].lon},
	    map: map,
	    title: needsList[i].name,
	    icon:'http://maps.google.com/mapfiles/kml/pal3/icon33.png'
	  });

	}

}
