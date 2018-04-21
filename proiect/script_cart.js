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


var app = angular.module('cartApp', []);
app.controller('bodyController', function($scope) {
    
    var cartString = getCookie("currentCart");
    if(cartString !== null){
       $scope.cart = JSON.parse(cartString);
    }
    else
       $scope.cart = [];

    $scope.plus = function(item){
            item.qt = item.qt + 1;
            setCookie("currentCart",JSON.stringify($scope.cart),5);
            //$scope.$apply();
    }

    $scope.minus = function(item){
        item.qt = item.qt - 1;
        if(item.qt <= 0)
            $scope.cart = $scope.cart.filter((a)=>{return a.id !== item.id});

        setCookie("currentCart",JSON.stringify($scope.cart),5);
        //$scope.$apply();
    }

    $scope.getTotal = function(){
        let s = 0;
        for(var i in $scope.cart)
            s+=$scope.cart[i].qt * $scope.cart[i].pret;
        return s;
    }
    
    //$scope.$apply();
});