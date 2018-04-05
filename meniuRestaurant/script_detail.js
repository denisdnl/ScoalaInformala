var MENU_ITEM_SERVER_URL = "https://restaurant-7593d.firebaseio.com//menu/";
var currentResp = null;


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function drawDetails(){
   // document.getElementById("img").querySelector("img").src = currentResp.imagine;
   document.getElementById("img").querySelector("img").src = "https://www.ecuisine.ro/wp-content/uploads/gogosi_mici_0.jpg";
   document.getElementById("title").innerHTML = currentResp.nume;
   document.getElementById("ingrediente").innerHTML = currentResp.ingrediente;
   document.getElementById("reteta").innerHTML = currentResp.reteta;
}

function getDetails(){
    var id = getParameterByName('id');

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function(ev){
        var resp = JSON.parse(ev.currentTarget.responseText);
        currentResp = resp;
        if (resp == null) {
           return;
        }

        drawDetails();
    };
    

    xhttp.open("GET",MENU_ITEM_SERVER_URL+id+".json");
    xhttp.send();
}


function redirectMenu(){
    window.location = "/index.html";
}

function redirectContact(){
    window.location = "/contact.html";
}