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

function sendInitNotification(){
  fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/notifications/send/",{
    body: new URLSearchParams({type:'Intiala',
                                phone:'+40758549064',
                               volunteer_id:1}), // must match 'Content-Type' header
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(function(response){	

});
}



function login(){
  window.location = "actiune.html";
}

function draw() {
  showLoadingModal();
  var http = new XMLHttpRequest();

  http.onload = function(response){
    famList = JSON.parse(response.currentTarget.response);
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

  http.open("GET","https://magicbox-robertdamoc1.c9users.io/magicbox/api/recipients/");
  http.send();
  

	
}

function drawList(){
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

    hideLoadingModal();
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

    var q = new XMLHttpRequest();



    q.onload = function(rsp){
    var xhttp = new XMLHttpRequest();
    var js = JSON.parse(rsp.currentTarget.response).results[0];
    
    if( famList[index].id_receipent != -1)
  fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/recipients/update/",{
    body: new URLSearchParams({name:famList[index].name,
                              address:famList[index].address,
                              notes:famList[index].details,
                              coordinates_lat:js.geometry.location.lat,
                              coordinates_long:js.geometry.location.lng,
                              recipient_id:famList[index].recipient_id}), // must match 'Content-Type' header
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(function(){	
                        draw();
                        hideEditModal();
                    });
      else
       
  fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/recipients/insert/",{
    body: new URLSearchParams({name:famList[index].name,
                              address:famList[index].address,
                              notes:famList[index].details,
                              coordinates_lat:js.geometry.location.lat,
                              coordinates_long:js.geometry.location.lng,
                              recipient_id:1}), // must match 'Content-Type' header
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(function(){	
                        draw();
                        hideEditModal();
                    });             

  } 

  var url = "http://maps.google.com/maps/api/geocode/json?address="+famList[index].address;
  q.open("GET",url);
  q.send();


}

function deleteDetails(index) {
	var index = document.getElementById("idHidden").value
  //famList.splice(index,1);
  console.log("request_id="+famList[index].recipient_id);
  var http = new XMLHttpRequest();
  http.onload = function(){}


  

  fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/recipients/delete",{
    body: new URLSearchParams({'recipient_id':famList[index].recipient_id}), // must match 'Content-Type' header
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(function(){	
                        draw();
                        hideEditModal();
                    })

		
}

function colete() {
	document.getElementById("nrColete").innerHTML = volunteerList.length +"/"+ famList.length;
}

function sorteaza() {
	famList = famList.sort((a,b)=>{
      return a.name[2]>b.name[2];
	});
	drawList();
}

function adauga() {
 /* 
  fetch("https://magicbox-robertdamoc1.c9users.io/magicbox/api/recipients/insert/",{
    body: new URLSearchParams({name:'dummy',
                              recipient_id:1}), // must match 'Content-Type' header
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    famList.push({
      id_receipent:myJson.recipient_id
      });
*/

famList.push({
  id_receipent:-1
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

markers = [];
function drawMap(){

  var http = new XMLHttpRequest();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }

  markers = [];
  http.onload = function(response){
    volunteerList = JSON.parse(response.currentTarget.response);
    for(var i in volunteerList){
      var marker = new google.maps.Marker({
        position: {lat:Number(volunteerList[i].coordinates_lat),
                    lng:Number(volunteerList[i].coordinates_long)},
        map: map,
        title: volunteerList[i].name,
        icon:'http://maps.google.com/mapfiles/kml/pal4/icon62.png'
      });
      markers.push(marker);
  }
}

  http.open("GET","https://magicbox-robertdamoc1.c9users.io/magicbox/api/volunteers/");
  http.send();

  


	for(var i in famList){
	  var marker = new google.maps.Marker({
	    position: {lat:Number(famList[i].coordinates_lat),
	               lng:Number(famList[i].coordinates_long)},
	    map: map,
	    title: famList[i].name,
	    icon:'http://maps.google.com/mapfiles/kml/pal3/icon33.png'
    });
    
    markers.push(marker);
	}

}
