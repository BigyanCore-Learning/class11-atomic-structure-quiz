/* =====================================================
   Atomic Structure CBT System
   Main Quiz Engine
===================================================== */


// -------------------------
// Global Variables
// -------------------------

let currentQuestion = 0;

let userAnswers = [];

let markedQuestions = [];

let questionStartTime = [];

let questionTimeSpent = [];

let examStarted = false;


let totalSeconds = 60 * 60; 
// 60 minutes


let timerInterval;

let questionTimerInterval;

let currentQuestionSeconds = 0;



// -------------------------
// Student Data
// -------------------------

let studentData = {

    name:"",
    roll:""

};



// -------------------------
// Start Button
// -------------------------


document
.getElementById("startExamBtn")
.onclick=function(){


    let name =
    document.getElementById("studentName").value.trim();


    let roll =
    document.getElementById("rollNumber").value.trim();



    if(name==="" || roll===""){

        alert(
        "অনুগ্রহ করে নাম এবং রোল নম্বর লিখুন।\nPlease enter Name and Roll Number."
        );

        return;

    }


    studentData.name=name;

    studentData.roll=roll;



    document
    .getElementById("student-section")
    .classList.add("hidden");


    document
    .getElementById("instruction-section")
    .classList.remove("hidden");

};





// -------------------------
// Begin Exam
// -------------------------


document
.getElementById("beginBtn")
.onclick=function(){


    examStarted=true;


    userAnswers =
    Array(questions.length)
    .fill(null);



    markedQuestions =
    Array(questions.length)
    .fill(false);



    questionTimeSpent =
    Array(questions.length)
    .fill(0);



    document
    .getElementById("instruction-section")
    .classList.add("hidden");



    document
    .getElementById("exam-section")
    .classList.remove("hidden");



    createPalette();


    showQuestion(0);


    startExamTimer();


};





// -------------------------
// Exam Timer
// -------------------------


function startExamTimer(){


timerInterval=setInterval(()=>{


    totalSeconds--;


    let min=
    Math.floor(totalSeconds/60);


    let sec=
    totalSeconds%60;



    document
    .getElementById("examTimer")
    .innerHTML=
    `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;



    if(totalSeconds<=0){


        clearInterval(timerInterval);


        submitExam();


    }



},1000);


}





// -------------------------
// Question Timer
// -------------------------


function startQuestionTimer(){


clearInterval(questionTimerInterval);


currentQuestionSeconds=0;



questionTimerInterval=
setInterval(()=>{


currentQuestionSeconds++;


document
.getElementById("questionTimer")
.innerHTML=
formatTime(currentQuestionSeconds);



},1000);


}



function formatTime(seconds){


let min=
Math.floor(seconds/60);


let sec=
seconds%60;


return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}




// -------------------------
// Display Question
// -------------------------


function showQuestion(index){


clearInterval(questionTimerInterval);



currentQuestion=index;



questionStartTime[index]=Date.now();



startQuestionTimer();



let q=questions[index];



document
.getElementById("questionNumber")
.innerHTML=
`প্রশ্ন ${index+1} / ${questions.length}`;



document
.getElementById("questionCounter")
.innerHTML=
`${index+1} / ${questions.length}`;



document
.getElementById("questionText")
.innerHTML=
q.question;



let container=
document.getElementById("optionsContainer");



container.innerHTML="";



q.options.forEach((option,i)=>{


let type=
q.type==="multiple"
?"checkbox"
:"radio";



let checked="";



if(userAnswers[index] &&
userAnswers[index].includes(
String.fromCharCode(65+i)
)){

checked="checked";

}



container.innerHTML +=

`

<label class="option">

<input 

type="${type}"

name="answer"

value="${String.fromCharCode(65+i)}"

${checked}

>

${option}

</label>

`;



});



document
.getElementById("hintBox")
.classList.add("hidden");


document
.getElementById("hintBox")
.innerHTML=q.hint;



updateProgress();


updatePalette();



}





// -------------------------
// Save Answer
// -------------------------


function saveAnswer(){


let selected=
document
.querySelectorAll(
'input[name="answer"]:checked'
);



let answers=[];


selected.forEach(item=>{

answers.push(item.value);

});



userAnswers[currentQuestion]=answers;



updatePalette();



}





document
.getElementById("optionsContainer")
.addEventListener(
"change",
saveAnswer
);





// -------------------------
// Hint Button
// -------------------------


document
.getElementById("hintBtn")
.onclick=function(){


let box=
document.getElementById("hintBox");



box.classList.toggle("hidden");


};





// -------------------------
// Navigation
// -------------------------


document
.getElementById("nextBtn")
.onclick=function(){


saveAnswer();


if(currentQuestion <
questions.length-1){


    questionTimeSpent[currentQuestion]
    +=
    Math.floor(
    (Date.now()-questionStartTime[currentQuestion])
    /1000
    );


    showQuestion(currentQuestion+1);


}


};





document
.getElementById("previousBtn")
.onclick=function(){


saveAnswer();


if(currentQuestion>0){

showQuestion(currentQuestion-1);

}


};





// -------------------------
// Mark for Review
// -------------------------


document
.getElementById("markBtn")
.onclick=function(){


markedQuestions[currentQuestion]
=
!markedQuestions[currentQuestion];


updatePalette();


};






// -------------------------
// Question Palette
// -------------------------


function createPalette(){


let palette=
document.getElementById(
"questionPalette"
);



palette.innerHTML="";



questions.forEach((q,i)=>{


let btn=
document.createElement("button");


btn.innerHTML=i+1;


btn.className="palette-btn";


btn.onclick=function(){

saveAnswer();

showQuestion(i);

};



palette.appendChild(btn);


});


}




function updatePalette(){


let buttons=
document
.querySelectorAll(
".palette-btn"
);



buttons.forEach((btn,i)=>{


btn.className="palette-btn";



if(userAnswers[i]
&& userAnswers[i].length>0){

btn.classList.add(
"answered"
);

}



if(markedQuestions[i]){

btn.classList.add(
"review"
);

}



});


}




function updateProgress(){


let answered=
userAnswers.filter(
x=>x && x.length>0
).length;



let percent=
(answered/questions.length)*100;



document
.getElementById("progressBar")
.style.width=
percent+"%";


}







// -------------------------
// Submit Exam
// -------------------------


document
.getElementById("submitBtn")
.onclick=function(){



let confirmSubmit=
confirm(
"আপনি কি পরীক্ষা জমা দিতে চান?\nDo you want to submit?"
);



if(confirmSubmit){

submitExam();

}


};





function submitExam(){



clearInterval(timerInterval);

clearInterval(questionTimerInterval);



saveAnswer();



let score=0;



questions.forEach((q,i)=>{


let correct=
JSON.stringify(
q.answer.sort()
);



let given=
(userAnswers[i]||[])
.sort();



if(
JSON.stringify(given)
===
correct
){

score++;

}


});




document
.getElementById("exam-section")
.classList.add("hidden");



document
.getElementById("result-section")
.classList.remove("hidden");



if(typeof generateReport==="function"){

generateReport(
score,
studentData,
userAnswers,
questionTimeSpent
);

}


}
