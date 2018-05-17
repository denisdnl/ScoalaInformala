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
                    <input type="button" value="Detalii" onclick="showRecipe('${recipes[rec].id}')"/>
                </div>
        </div>
        `;

        html+=rand;
    }

    document.getElementById("content").innerHTML = html;
}

function redirectContact(){
    window.location = "/contact.html";
}

function getAllRecipes(){
    var xhttp = new XMLHttpRequest();

    xhttp.onload = function(ev){
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
    

    xhttp.open("GET",MENU_SERVER_URL);
    xhttp.send();
}

function showRecipe(id){
    window.location = "showrecipe.html?id="+id;
}

function searchKeyUp(obj,ev){
    if(obj.value.length == 0){
        drawIngredients(allRecipes);
    }
    else{
        var term = obj.value;
        var filteredRecipes =  allRecipes.filter((a)=>{return a.ingrediente.includes(term)});
        drawIngredients(filteredRecipes);
    }
}
