function hideLoadingModal(){
	document.getElementById("loadingModal").classList = ["loadingModalHidden"];
}

function showLoadingModal(){
	document.getElementById("loadingModal").classList = ["loadingModalShown"];
}



function onScroll(){
    if(document.body.scrollTop > 75+5){
        if(!document.querySelector("#header").classList.contains("scrolled"))
        document.querySelector("#header").classList.add("scrolled");
    }
    else{
        if(document.querySelector("#header").classList.contains("scrolled"))
        document.querySelector("#header").classList.remove("scrolled");
    }
}

function playAnimation(){
    document.querySelector("#btnDiv").classList.remove("animation-cart");
    void document.querySelector("#btnDiv").offsetWidth;
    document.querySelector("#btnDiv").classList.add("animation-cart");
}


function addToCart(item){
     var cartString = getCookie("currentCart");
     var cart;
     if(cartString !== null){
        cart = JSON.parse(cartString);
     }
     else
        cart = [];

    var product = cart.filter(
        (a)=>{return a.id === item.id;}
    );

    if(product.length > 0){
        product[0].qt = product[0].qt + 1;
    }
    else{
        cart.push({
            nume_produs:item.nume_produs,
            id:item.id,
            pret:item.pret,
            icon_url:item.icon_url,
            qt:1
        });
    }

    setCookie("currentCart",JSON.stringify(cart),5);

}


function openCart(){
    window.location = "/cart.html";
}