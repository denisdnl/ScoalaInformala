var MENU_SERVER_URL = "https://restaurant-7593d.firebaseio.com/menu/.json";

var Ingredient={
    imagine:null,
    ingrediente:null,
    nume:null,
    reteta:null
}

function cancel(){
    window.location = "/admin/index.html"
}


function addRecipe(){
    var nume = document.getElementById("nume_reteta").value;
    var url = document.getElementById("url_imag").value;
    var ingrediente = document.getElementById("ingrediente").value;
    var reteta = document.getElementById("reteta").value;

    if(nume.length == 0 || url.length == 0 || ingrediente.length == 0 || reteta.length == 0  ){
        alert("Completati toate campurile");
        return;
    }

    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("content").style.display = "none";

    var xhttp = new XMLHttpRequest();

    var obj = Object.create(Ingredient);
    obj.imagine = url;
    obj.nume = nume;
    obj.reteta = reteta;
    obj.ingrediente = ingrediente;

    xhttp.onload = function(){
        document.getElementById("loadingDiv").style.display = "none";
        cancel();
    }

    xhttp.onerror = function(ev){
        alert(ev.error);
        document.getElementById("loadingDiv").style.display = "none";
        document.getElementById("content").style.display = "block";
    }

    xhttp.open("POST",MENU_SERVER_URL);
    xhttp.send(JSON.stringify(obj));
}