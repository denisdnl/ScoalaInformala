var Product = {
    product:null,
    isMarked:false
}

var productList=[];

function getMarkClass(i){
    if(productList[i].isMarked)
        return "marked";
    else
        return "notmarked";
}


function refreshListGUI(){
    var html = "";
    for(var i=0;i<productList.length;i++){
        var rand = `
            <tr>
            <td class="${getMarkClass(i)}">${productList[i].product}</td>
            <td><input type="button" value=" Mark as buyed " onclick="mark(${i})"/>
            </tr>
        `;
        html+=rand;
    }
    document.querySelector("tbody").innerHTML = html;
}

function addProduct(){
    var prod = document.getElementById("addProductTxt").value;
    
    if(prod.length == 0) {
        alert("Introdu nume produs");
        return;
    }
    
    
    var p = Object.create(Product);
    p.product = prod;
    p.isMarked = false;
    productList.push(p);

    refreshListGUI();
}


function mark(i){
    productList[i].isMarked=true;
    refreshListGUI();
}

function sortAsc(){
    productList = productList.sort((a,b)=>{return a.product>b.product;});
    refreshListGUI();
}

function sortDesc(){
    productList = productList.sort((a,b)=>{return a.product>b.product;});
    productList.reverse();
    refreshListGUI();
}

function clearTxt(){
    document.getElementById('addProductTxt').value="";
}

function keyPress(ev){
    if(ev.keyCode == 13){
        ev.preventDefault();
        addProduct();
        clearTxt();
    }
}