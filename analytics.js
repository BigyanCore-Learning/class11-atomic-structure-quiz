/* =====================================================
   Atomic Structure CBT
   Performance Analytics System
===================================================== */


function generateAnalytics(
    userAnswers
){

let topicStats={};


questions.forEach((q,index)=>{


let topic=q.topic;


if(!topicStats[topic]){

topicStats[topic]={

total:0,
correct:0

};

}



topicStats[topic].total++;



let user=
(userAnswers[index]||[])
.sort();



let correct=
q.answer.sort();



if(
JSON.stringify(user)
===
JSON.stringify(correct)
){

topicStats[topic].correct++;

}


});





let strongTopics=[];

let weakTopics=[];



Object.keys(topicStats)
.forEach(topic=>{


let data=
topicStats[topic];



let accuracy=
(data.correct/data.total)*100;



if(accuracy>=75){

strongTopics.push(
topic
);

}

else if(accuracy<50){

weakTopics.push(
topic
);

}



});





let totalCorrect=0;

let totalQuestions=
questions.length;



Object.values(topicStats)
.forEach(item=>{

totalCorrect+=item.correct;

});



let percentage=
Math.round(
(totalCorrect/totalQuestions)*100
);





let level="";



if(percentage>=85){

level=
"Excellent Foundation ⭐⭐⭐⭐⭐";

}

else if(percentage>=70){

level=
"Good Foundation ⭐⭐⭐⭐";

}

else if(percentage>=50){

level=
"Developing Level ⭐⭐⭐";

}

else{

level=
"Needs More Practice ⭐⭐";

}





let suggestions=[];



weakTopics.forEach(topic=>{


switch(topic){


case "Quantum Numbers":

suggestions.push(
"Quantum Numbers এবং Orbital ধারণা আরও অনুশীলন করুন।"
);

break;



case "Bohr Model":

suggestions.push(
"Bohr Equation ও Hydrogen Spectrum-এর numerical practice করুন।"
);

break;



case "Electron Configuration":

suggestions.push(
"Aufbau, Hund এবং Pauli rule পুনরাবৃত্তি করুন।"
);

break;



case "Shapes of Orbitals":

suggestions.push(
"Orbital shape ও radial probability graph revise করুন।"
);

break;



default:

suggestions.push(
topic+" chapter-এর basic concept revise করুন।"
);


}


});





if(suggestions.length===0){

suggestions.push(
"আপনার দুর্বল কোনো নির্দিষ্ট topic পাওয়া যায়নি। Regular practice চালিয়ে যান।"
);

}





return {


percentage:percentage,

level:level,

topicStats:topicStats,

strongTopics:strongTopics,

weakTopics:weakTopics,

suggestions:suggestions


};


}
