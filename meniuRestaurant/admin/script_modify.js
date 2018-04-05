var MENU_ITEM_SERVER_URL = "https://restaurant-7593d.firebaseio.com/menu/";

var Ingredient = {
    imagine: null,
    ingrediente: null,
    nume: null,
    reteta: null
}

function cancel() {
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

function loadRecipe() {
    var key = getParameterByName("key");

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function (ev) {
        var resp = JSON.parse(ev.currentTarget.responseText);
        if (resp == null) {
            return;
        }

        document.getElementById("url_imag").value = resp.imagine;
        document.getElementById("nume_reteta").value = resp.nume;
        document.getElementById("ingrediente").innerHTML = resp.ingrediente;
        document.getElementById("reteta").innerHTML = resp.reteta;
    };


    xhttp.open("GET", MENU_ITEM_SERVER_URL + key + ".json");
    xhttp.send();

}

function modifyRecipe() {
    var key = getParameterByName("key");

    var nume = document.getElementById("nume_reteta").value;
    var url = document.getElementById("url_imag").value;
    var ingrediente = document.getElementById("ingrediente").value;
    var reteta = document.getElementById("reteta").value;

    if (nume.length == 0 || url.length == 0 || ingrediente.length == 0 || reteta.length == 0) {
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

    xhttp.onload = function () {
        document.getElementById("loadingDiv").style.display = "none";
        cancel();
    }

    xhttp.onerror = function (ev) {
        alert(ev.error);
        document.getElementById("loadingDiv").style.display = "none";
        document.getElementById("content").style.display = "block";
    }

    xhttp.open("PUT", MENU_ITEM_SERVER_URL + key + ".json");
    xhttp.send(JSON.stringify(obj));
}