var MENU_SERVER_URL = "https://restaurant-7593d.firebaseio.com/.json";

var Ingredient={
    id:null,
    imagine:null,
    ingrediente:null,
    nume:null,
    reteta:null
}

var allRecipes = null;


function drawIngredients(recipes){
    
    var html = "";
    for(var rec in recipes){
        if(recipes[rec] == null) continue;

        var rand = `
        <div class="menuElement">
                <img src="${recipes[rec].imagine}"/>
                <div class="ct">
                    <div class="title">${recipes[rec].nume}</div>
                    <div class="ingedients">${recipes[rec].ingrediente}</div>
                </div>
                <div class="btn">
                    <input type="button" value="Modifica" onclick="modifyRecipe('${recipes[rec].id}')"/>&nbsp;
                    <input type="button" value="Sterge" onclick="deleteRecipe('${recipes[rec].id}','${recipes[rec].nume}')"/>
                </div>
        </div>
        `;

        html+=rand;
    }

    document.getElementById("content").innerHTML = html;
}

function addRecipe(){
    window.location = "addRecipe.html";
}

function getAllRecipes(){
    var xhttp = new XMLHttpRequest();

    xhttp.onerror = function(ev){
        alert(ev.error);
        document.getElementById("loadingDiv").style.display = "none";
        document.getElementById("content").style.display = "block";
    }

    xhttp.onload = function(ev){

        document.getElementById("loadingDiv").style.display = "none";
        document.getElementById("content").style.display = "block";

        var resp = JSON.parse(ev.currentTarget.responseText);
        allRecipes = [];

        if (resp != null) {
            for (var i in resp.menu) {
                if(resp.menu[i] == null) continue;

                var obj = Object.create(Ingredient);
                obj.id = i;
                obj.nume = resp.menu[i].nume;
                obj.ingrediente = resp.menu[i].ingrediente;
                obj.reteta = resp.menu[i].reteta;
              //  obj.imagine = resp.menu[i].imagine;
              obj.imagine = "https://www.ecuisine.ro/wp-content/uploads/gogosi_mici_0.jpg";
                allRecipes.push(obj);
            }
        }
        drawIngredients(allRecipes);
    };
    
    document.getElementById("loadingDiv").style.display = "block";
    document.getElementById("content").style.display = "none";

    xhttp.open("GET",MENU_SERVER_URL);
    xhttp.send();
}

function showRecipe(id){
    window.location = "showRecipe.html?id="+id;
}

function searchKeyDown(obj,ev){
    if(obj.value.length == 0){
        drawIngredients(allRecipes);
    }
    else{
        var term = obj.value;
        var filteredRecipes =  allRecipes.filter((a)=>{return a.ingrediente.includes(term)});
        drawIngredients(filteredRecipes);
    }
}


function deleteRecipe(key,nume){
    window.location = "delete.html?key="+key+"&nume="+nume;
}

function modifyRecipe(key){
    window.location = "modify.html?key="+key;
}
