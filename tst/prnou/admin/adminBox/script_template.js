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

function redraw(){
  showLoadingModal();
  getFamilies();
  getVolunteers();

  famList = famList.filter((a)=>{return a.name !== null});
  setCookie("famList",JSON.stringify(famList),7);
  draw();
}

function getVolunteers(){
  if(getCookie("volList") == null){
    setCookie("volList",JSON.stringify(
        [
          {
            id:1,
            name:"Alex Vasilescu",
            lat:44.9321597,
            lon:25.9398524,
            detalii:"0728234534",
            address:"Iuliu Maniu, 6, Bucuresti",
          },

          {
            id:2,
            name:"Dana Ilinca",
            lat:45.7410432,
            lon:21.1465498,
            detalii:"0728234534",
            address:"Iuliu Maniu, 6, Bucuresti",
            assignee_id:1
          },

          {
            id:3,
            name:"Ion Andreescu",
            lat:45.6524567,
            lon:25.5264228,
            detalii:"Familie nevoiasa, 3 copii",
            address:"Iuliu Maniu, 6, Cluj",
            assignee_id:1
          }
        ]


    ),7);
  }

  volList = JSON.parse(getCookie("volList"));
}

function getFamilies(){
  if(getCookie("famList") == null){
    setCookie("famList",JSON.stringify(
        [
          {
            id:1,
            status:"Unassgned",
            name:"Familia Ion",
            lat:44.4377401,
            lon:25.954553,
            detalii:"Familie nevoiasa, 2 copii",
            address:"Iuliu Maniu, 6, Bucuresti",
            assignee_id:null
          },

          {
            id:2,
            status:"Assigned",
            name:"Familia Georgescu",
            lat:46.7833002,
            lon:23.4764283,
            detalii:"Familie nevoiasa, 3 copii",
            address:"Iuliu Maniu, 6, Bucuresti",
            assignee_id:1
          },

          {
            id:3,
            status:"Assigned",
            name:"Familia Andreescu",
            lat:47.156116,
            lon:27.5169305,
            detalii:"Familie nevoiasa, 3 copii",
            address:"Iuliu Maniu, 6, Cluj",
            assignee_id:1
          },

          {
            id:4,
            status:"Assigned",
            name:"Familia Grigore",
            lat:47.1971695,
            lon:27.6600604,
            detalii:"Familie nevoiasa, 3 copii",
            address:"Iuliu Maniu, 6, Iasi",
            assignee_id:1
          }
        ]


    ),7);
  }

  famList = JSON.parse(getCookie("famList"));
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
}

function openEditor(i){
	populateLoadingModal(i);
	showEditModal();
}

function populateLoadingModal(index){
    document.getElementById("name").value = famList[index].name;
    document.getElementById("address").value = famList[index].address;
    document.getElementById("details").value = famList[index].detalii;
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
      famList[index].lat = js.geometry.location.lat;
      famList[index].lon = js.geometry.location.lng;

      setCookie("famList",JSON.stringify(famList),7);

      redraw();
      hideEditModal();
    }  
                                

  

  var url = "http://maps.google.com/maps/api/geocode/json?address="+famList[index].address;
  q.open("GET",url);
  q.send();


}

function deleteDetails(index) {
	var index = document.getElementById("idHidden").value
  famList.splice(index,1);
  setCookie("famList",JSON.stringify(famList),7);
  
  redraw();
  hideEditModal();
}

function colete() {
	document.getElementById("nrColete").innerHTML = famList.filter((a)=>{return a.status == "Adopted";}).length +"/"+ famList.length;
}

function sorteaza() {
	famList = famList.sort((a,b)=>{
		if(a.status == "Assigned")
			return 1;
		else
			return 0;
	});
	draw();
}

function adauga() {
famList.push({
            id:null,
            status:"Unassigned",
            name:null,
            lat:null,
            lon:null,
            detalii:null,
            address:null,
            assignee_id:null
  });
    populateLoadingModal(famList.length - 1);
	  showEditModal();

}

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

}

function drawMap(){


  
  for(var i in volList){
      var marker = new google.maps.Marker({
        position: {lat:Number(volList[i].lat),
                    lng:Number(volList[i].lon)},
        map: map,
        title: volList[i].name,
        icon:'http://maps.google.com/mapfiles/kml/pal4/icon62.png'
  });
      
  }

	for(var i in famList){
	  var marker = new google.maps.Marker({
	    position: {lat:Number(famList[i].lat),
	               lng:Number(famList[i].lon)},
	    map: map,
	    title: famList[i].name,
	    icon:'http://maps.google.com/mapfiles/kml/pal3/icon33.png'
    });
    
    setTimeout(()=>{hideLoadingModal()},Math.random()*500);
	}

}
