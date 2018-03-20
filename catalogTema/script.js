var Student={
    name:null,
    uid:null,
    grades:null,

    getAverage:function(){
        if(this.grades.length == 0)
            return "";
        var s=0;
        for(var i=0;i<this.grades.length;i++)
            s+=this.grades[i];
        return (s/this.grades.length).toFixed(2);
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
    s.grades = [];
    studentsList.push(s);

    refreshStudentList();

}


function refreshGradesList(){
    var gradesTable = document.getElementById("gradesList").querySelector("tbody");
    var html = "";
    var currentStudent = studentsList.filter(a=>{return a.uid === currentUID})[0];

    for(var i=0;i<currentStudent.grades.length;i++){
        var rand = `<tr><td>${currentStudent.grades[i]}</td></tr>`;
        html+=rand;
    }

    gradesTable.innerHTML = html;
}

function refreshGradesStudentName(){
    var currentStudent = studentsList.filter(a=>{return a.uid === currentUID})[0];
    document.querySelector("#note_elevi_wrapper>p").innerHTML = `Note elev ${currentStudent.name}`;
}

function showGrades(i){
    document.getElementById("note_elevi_wrapper").style.display="block";
    currentUID = studentsList[i].uid;

    refreshGradesStudentName();
    refreshGradesList();
}


function addGrade(){
    
    var grade = document.getElementById("addGradeTxt").value;

    if(Number.parseInt(grade) <= 0 || Number.parseInt(grade) > 10 || grade.length == 0 || isNaN(grade)) 
        return;

    var currentStudent = studentsList.filter(a=>{return a.uid === currentUID})[0];
    currentStudent.grades.push(Number.parseInt(grade));
    refreshGradesList();
    refreshStudentList();
}


function sortAscStudents(){
    studentsList.sort((a,b)=>{return a.getAverage() >= b.getAverage()});
    refreshStudentList();
}


function sortDescStudents(){
    studentsList.sort((a,b)=>{return a.getAverage() < b.getAverage()});
    refreshStudentList();
}

function sortAscGrades(){
    studentsList.filter(a=>{return a.uid === currentUID})[0].grades.sort((a,b)=>{return a >= b});
    refreshGradesList();
}


function sortDescGrades(){
    studentsList.filter(a=>{return a.uid === currentUID})[0].grades.sort((a,b)=>{return a < b});
    refreshGradesList();
}


function keyPressSt(ev){
    if(ev.keyCode == 13){
        ev.preventDefault();
        addStudent();
        document.getElementById("addStudentTxt").value = "";
    }
}

function keyPressGrd(ev){
    if(ev.keyCode == 13){
        ev.preventDefault();
        addGrade();
        document.getElementById("addGradeTxt").value = "";
    }
}