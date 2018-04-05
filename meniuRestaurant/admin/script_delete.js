var MENU_SERVER_URL = "https://restaurant-7593d.firebaseio.com/menu/";

function cancel(){
    window.location = "/admin/index.html"
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function drawText(){
    var name=getParameterByName("nume");
    var text=`Sunteti pe cale sa stergeti reteta <em>${name}</em></br> Sunteti sigur?`;
    document.getElementById("content").innerHTML = text;
}


function confirm(){
    var key=getParameterByName("key");
    var URL = MENU_SERVER_URL+key+".json";

    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("content").style.display = "none";

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function(){
        document.getElementById("loadingDiv").style.display = "none";
        cancel();
    }

    xhttp.onerror = function(ev){
        alert(ev.error);
        document.getElementById("loadingDiv").style.display = "none";
        document.getElementById("content").style.display = "block";
    }

    xhttp.open("DELETE",URL);
    xhttp.send();
}