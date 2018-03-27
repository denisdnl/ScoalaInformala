var Contact = {
    nume: null,
    telefon: null,
    key: null
};

var contactList = [];

Array.prototype.findIndexCustom = function (fct) {
    for (var i in this) {
        if (fct(this[i]) === true)
            return i;
    }
    return -1;
}

function drawContacts() {
    var req = new XMLHttpRequest();

    req.onload = function (ev) {
        var resp = JSON.parse(ev.currentTarget.responseText);
        contactList = [];

        if (resp != null) {
            for (var i in resp) {
                var obj = Object.create(Contact);
                obj.nume = resp[i].nume;
                obj.telefon = resp[i].telefon;
                obj.key = i;
                contactList.push(obj);
            }
        }
        refreshList();
    };

    req.open("GET", "https://agenda-fc4b8.firebaseio.com/.json");
    req.send();
}

function refreshList() {
    var html = "";
    for (var i in contactList) {
        if(!contactList.hasOwnProperty(i)){
            continue;
        }
        var rand = `<tr id="${"tr" + i}"><td>${contactList[i].nume}</td>
                        <td>${contactList[i].telefon}</td>
                        <td><a class="modifyClass shownModify" href="javascript:modifica('${contactList[i].nume}','${contactList[i].telefon}',${"tr" + i})">Modifica</a>
                        <a class="okclass hiddenOK" href="javascript:confirmaModificare('${contactList[i].nume}','${contactList[i].telefon}',${"tr" + i})">OK</a></td>
                        <td><a href="javascript:sterge('${contactList[i].nume}','${contactList[i].telefon}','${contactList[i].key}')">Sterge</a></td>
                    </tr>`
        html += rand;
    }

    document.getElementById("tableContacts").querySelector("tbody").innerHTML = html;
}



function sterge(nume, telefon, key) {
    //contactList = contactList.filter((a)=>{return !(a.nume === nume && a.telefon === telefon)});

    var req = new XMLHttpRequest();
    req.onload = function () {
        drawContacts()
    };

    req.open("DELETE", "https://agenda-fc4b8.firebaseio.com/" + key + "/.json");
    req.send();
}

/*function modifica(nume,telefon){

    var numeNou = document.querySelector("[name='nume']").value;
    var telefonNou = document.querySelector("[name='telefon']").value;

    var ct = contactList.filter((a)=>{return (a.nume === nume && a.telefon === telefon)})[0];
    ct.nume = numeNou;
    ct.telefon = telefonNou;

    drawContacts();
}*/

function modifica(nume, telefon, obj) {

    if (document.getElementsByClassName("shownOK").length > 0) {
        alert("Un element deja in modificare");
        return;
    }

    document.querySelector("[name='nume']").value = nume;
    document.querySelector("[name='telefon']").value = telefon;

    obj.querySelector(".okclass").classList.remove("hiddenOK");
    obj.querySelector(".okclass").classList.add("shownOK");

    obj.querySelector(".modifyClass").classList.add("hiddenModify");
    obj.querySelector(".modifyClass").classList.remove("shownModify");
}

function confirmaModificare(nume, telefon, obj) {


    obj.querySelector(".okclass").classList.remove("shownOK");
    obj.querySelector(".okclass").classList.add("hiddenOK");

    obj.querySelector(".modifyClass").classList.remove("hiddenModify");
    obj.querySelector(".modifyClass").classList.add("shownModify");

    var numeNou = document.querySelector("[name='nume']").value;
    var telefonNou = document.querySelector("[name='telefon']").value;

    var ct = contactList.filter((a) => { return (a.nume === nume && a.telefon === telefon) })[0];
    ct.nume = numeNou;
    ct.telefon = telefonNou;

    var req = new XMLHttpRequest();

    req.onload = function(){
        drawContacts();
    }

    var q = {
        "nume":ct.nume,
        "telefon":ct.telefon
    };

    req.open("PUT","https://agenda-fc4b8.firebaseio.com/"+ct.key+"/.json");
    req.send(JSON.stringify(q));

}

function addContact() {
    var nume = document.querySelector("[name='nume']").value;
    var telefon = document.querySelector("[name='telefon']").value;

    if (contactList.filter((a) => { return (a.nume === nume && a.telefon === telefon) }).length > 0) {
        alert("Contact deja existent");
        return;
    }

    var obj = Object.create(Contact);
    obj.nume = nume;
    obj.telefon = telefon;

    //  contactList.push(obj);

    var req = new XMLHttpRequest();

    req.onload = function () {
        drawContacts();
    };

    req.open("POST", "https://agenda-fc4b8.firebaseio.com/.json");
    req.send(JSON.stringify(obj));

}

