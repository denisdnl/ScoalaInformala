var Student={
    name:null,
    uid:null,
    grades:[],

    getAverage:function(){
        if(this.grades.length == 0)
            return "";
        var s=0;
        for(var i=0;i<this.grades.length;i++)
            s+=this.grades[i];
        return s/this.grades.length;
    }
};

var studentsList = [];
var currentUID = "";

function hideGrades(){
    document.querySelector("#note_elevi_wrapper").style.display = "none";
}


function refreshStudentList(){
    var html = "";

    for(var i=0;i<studentsList.length;i++){
        var rand = `<tr>
                        <td>${studentsList[i].name}</td>
                        <td>${studentsList[i].getAverage()}</td>
                        <td><input type="button" value="Vezi notele" onclick="showGrades(${i})"/></td>
                    </tr>`;
    html+=rand;
    }

    document.getElementById("studentsList").querySelector("tbody").innerHTML = html;
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

function addStudent(){
    var st = document.getElementById("addStudentTxt").value;

    if(st.length == 0){
        alert("Provide a name");
        return;
    }

    var s = Object.create(Student);
    s.name = st;
    s.uid = guid();
    studentsList.push(s);

    refreshStudentList();

}


function showGrades(i){
    document.getElementById("note_elevi_wrapper").style.display="block";
    currentUID = studentsList[i].uid;
    refreshGradesList();
}
