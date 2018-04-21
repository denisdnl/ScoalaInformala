function menuOnMouseOver(){
    document.getElementById("imgDiv").querySelector("img").src = "menu_icon_hover.png";
}

function menuOnMouseOut(){
    document.getElementById("imgDiv").querySelector("img").src = "menu_icon.png";
}

function toggleMenu(){
    var menu = document.getElementById("menu");
    if(menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
        menu.classList.add("shown");
    }
    else{
        menu.classList.remove("shown");
        menu.classList.add("hidden"); 
    }
}