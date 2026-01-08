let studentName = document.getElementById('student_name');
let MidGrade = document.getElementById('Mid_grade');
let ExamGrade = document.getElementById('Exam_grade');
let TasksAverage = document.getElementById('TasksAverage');
let attendancyPercent = document.getElementById('attendancyPercent');
let Bonus = document.getElementById('Bonus');
let total = document.getElementById('total');
let TotalGrade = document.getElementById('totalGrade');
let submit = document.getElementById('submit'); // add

let mood = 'Add';
let temp;

// calc total


function calcTotal() {

    let taskInput = +TasksAverage.value || 0;

    if (!Number.isInteger(taskInput) || taskInput < 0 || taskInput > 100) {
        alert('Tasks average must be an integer between 0 and 100');
        TasksAverage.value = '';
        return;
    }

    let taskAvg = (taskInput / 100) * 10;

    let attendInput = +attendancyPercent.value || 0;

    if (!Number.isInteger(attendInput) || attendInput < 0 || attendInput > 100) {
        alert('Attendance must be an integer between 0 and 100');
        attendancyPercent.value = '';
        return;
    }

    let attendancy = (attendInput / 100) * 10;


    let examInput = +ExamGrade.value || 0;

    if (!Number.isInteger(examInput) || examInput < 0 || examInput > 60) {
        alert('Exam Grade must be an integer between 0 and 60');
        ExamGrade.value = '';
        return;
    }

    let exam = examInput;

    let midInput = +MidGrade.value || 0;

    if (!Number.isInteger(midInput) || midInput < 0 || midInput > 20) {
        alert('Mid Grade must be an integer between 0 and 20');
        MidGrade.value = '';
        return;
    }
    let mid = midInput;

    let result = (mid + exam + taskAvg + attendancy);
    total.innerHTML = result.toFixed(2);

    calcTotalGrade(result);


}

function calcTotalGrade(result) {


    let bonus = (+Bonus.value || 0);
    if (!Number.isInteger(bonus) || bonus < 0) {
        alert('Bonus must be integer, Enter the correct Bonus');
        return;
    }
    let totalresult = result + bonus;
    TotalGrade.innerHTML = totalresult.toFixed(2);
    if(totalresult > 100)
    {
        alert('Congratulations , You Skiped the Full Mark');
    }

}
// create or add new student
let students_Data = [];

if (localStorage.getItem('student')) {
    let storedData = JSON.parse(localStorage.getItem('student'));
    students_Data = Array.isArray(storedData) ? storedData : [];
}


submit.onclick = e => {
   
    if (studentName.value.trim() === '') {
        alert('Please , Enter student name :')
        return;
    }
    // create object
    let newStudent = {
        StudentName: studentName.value,
        Exam_Grade: +ExamGrade.value || 0,
        MidTerm: +MidGrade.value || 0,
        TasksAverage: +TasksAverage.value || 0,
        Attendancy: +attendancyPercent.value || 0,
        Bonuss: +Bonus.value || 0,
        total: parseFloat(total.textContent),
        totalGrade: parseFloat(TotalGrade.textContent)
    };

    // add object to array
    if (mood === 'Add') {

        students_Data.push(newStudent);

    }
    else {
        students_Data[temp] = newStudent;
        mood = 'Add';
        submit.innerHTML = 'Add New Student';

    }
    //  add array to local storage
    localStorage.setItem('student', JSON.stringify(students_Data));
    clearData();
    displayData();




}

// clear inputs
function clearData() {
    studentName.value = '';
    ExamGrade.value = '';
    MidGrade.value = '';
    TasksAverage.value = '';
    attendancyPercent.value = '';
    Bonus.value = '';
    total.textContent = '00.00';
    TotalGrade.textContent = '00.00';


}

// display data 
function displayData() {
    let table = '';
    for (let i = 0; i < students_Data.length; i++) {
        let status ;
        let bgColor ;
        if(students_Data[i].total > 90)
        {
             status = 'passed';
             bgColor = 'rgba(187, 165, 42, 1)';
        }
        else if(students_Data[i].total >= 60){
             status = 'passed';
             bgColor = 'rgba(54, 187, 42, 1)';

        }
        else{
             status = 'Failed';
             bgColor = 'rgba(193, 28, 13, 1)';

        }

        table +=
            `
                                <tr>
                                <td>${i + 1}</td>
                                <td>${students_Data[i].StudentName}</td>
                                <td>${students_Data[i].Exam_Grade}</td>
                                <td>${students_Data[i].MidTerm}</td>
                                <td>${students_Data[i].TasksAverage}</td>
                                <td>${students_Data[i].Attendancy}</td>
                                <td>${students_Data[i].Bonuss}</td>
                                <td>${students_Data[i].total}</td>
                                <td>${students_Data[i].totalGrade}</td>
                                <td><p id= 'status' style="background-color:${bgColor}  ; text-align : center ; color : white ; padding : 6px ; border-radius:5px; ">${status}</p><td>
                                <td><button onclick="update(${i})" id="update">Update</button></td>
                                <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                            
                            </tr>
                    
                    
                    `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (students_Data.length > 0) {
        btnDeleteAll.innerHTML =
            `
                    <button onclick="DeleteAll()" id="delAll">delete All data(${students_Data.length})</button>
                    `
    }
    else {
        btnDeleteAll.innerHTML = '';

    }

}
// display data when page is loaded
displayData();



// update
function update(i) {
    studentName.value = students_Data[i].StudentName;
    ExamGrade.value = students_Data[i].Exam_Grade;
    MidGrade.value = students_Data[i].MidTerm;
    TasksAverage.value = students_Data[i].TasksAverage;
    attendancyPercent.value = students_Data[i].Attendancy;
    Bonus.value = students_Data[i].Bonuss;
    total.innerHTML = (students_Data[i].total);

    TotalGrade.innerHTML = students_Data[i].totalGrade;

    calcTotal();
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// delete specific item
function deleteItem(i) {
    // delete from array
    students_Data.splice(i, 1);
    // delete from local storage => add array to local storage after deletion process
    localStorage.student = JSON.stringify(students_Data);
    displayData();

}
// delete all data 
function DeleteAll() {
    if (confirm('Warning!!! If you press Ok you will delete all data , Are you sure about this ?')) {
        // delete data from array
        students_Data.splice(0);
        // delete from local storage => add array to local storage after deletion process
        localStorage.student = JSON.stringify(students_Data);
        displayData();

    }



}

let search = document.getElementById('search');
search.onkeyup = function () {
    searchData(this.value);
}
function searchData(value) {
    let table = '';
    let found = false;
    for (let i = 0; i < students_Data.length; i++) {
        if ((students_Data[i].StudentName).toLowerCase().trim().includes(value.toLowerCase().trim())) {
            found = true ;

             let status ;
        let bgColor ;
        if(students_Data[i].total > 90)
        {
             status = 'passed';
             bgColor = 'rgba(187, 165, 42, 1)';
        }
        else if(students_Data[i].total >= 60){
             status = 'passed';
             bgColor = 'rgba(54, 187, 42, 1)';

        }
        else{
             status = 'Failed';
             bgColor = 'rgba(193, 28, 13, 1)';

        }
            
            table +=
                `
                                <tr>
                                <td>${i + 1}</td>
                                <td>${students_Data[i].StudentName}</td>
                                <td>${students_Data[i].Exam_Grade}</td>
                                <td>${students_Data[i].MidTerm}</td>
                                <td>${students_Data[i].TasksAverage}</td>
                                <td>${students_Data[i].Attendancy}</td>
                                <td>${students_Data[i].Bonuss}</td>
                                <td>${students_Data[i].total}</td>
                                <td>${students_Data[i].totalGrade}</td>
                                  <td><p id= 'status' style="background-color:${bgColor}  ; text-align : center ; color : white ; padding : 6px ; border-radius:5px; ">${status}</p><td>
                                <td><button onclick="update(${i})" id="update">Update</button></td>
                                <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                            
                               </tr>
                    
                    
                             `;

        }
       
    }
    if (!found) {
        table = `
        <tr>
            <td colspan="11" style="text-align:center; color:white; font-family:'Times New Roman', Times, serif ; font-size:larger;">This Student is Unavailable</td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;


}



