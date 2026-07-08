/* =====================================================
   Atomic Structure CBT
   Result Report Generator
===================================================== */


function generateReport(
score,
studentData,
userAnswers,
questionTimeSpent
){


let analytics =
generateAnalytics(userAnswers);



let attempted =
userAnswers.filter(
x=>x && x.length>0
).length;



let incorrect =
attempted-score;



let percentage =
Math.round(
(score/questions.length)*100
);



let resultHTML = `


<div class="result-box">


<h2>
পরীক্ষার ফলাফল (Examination Result)
</h2>



<h3>
${studentData.name}
</h3>


<p>
Roll Number:
${studentData.roll}
</p>



<div class="score">

${score} / ${questions.length}

</div>



<h3>

Percentage:
${percentage}%

</h3>



<hr>


<h3>
Performance Level
</h3>


<p>

${analytics.level}

</p>



<hr>



<h3>
Detailed Analysis
(বিশ্লেষণ)
</h3>


<table border="1" width="100%" cellpadding="10">


<tr>

<th>
Topic
</th>


<th>
Correct
</th>


<th>
Total
</th>


<th>
Accuracy
</th>


</tr>


`;





Object.keys(
analytics.topicStats
)
.forEach(topic=>{


let data=
analytics.topicStats[topic];


let acc=
Math.round(
(data.correct/data.total)*100
);



resultHTML +=

`

<tr>

<td>
${topic}
</td>


<td>
${data.correct}
</td>


<td>
${data.total}
</td>


<td>
${acc}%
</td>


</tr>

`;



});





resultHTML +=

`

</table>


<hr>


<h3>
আপনার শক্তিশালী বিষয়
(Strong Areas)
</h3>


<ul>

`;




analytics.strongTopics
.forEach(topic=>{


resultHTML +=

`

<li>
${topic}
</li>

`;


});



resultHTML +=

`

</ul>



<h3>
যে বিষয়গুলিতে আরও উন্নতি প্রয়োজন
(Improvement Areas)
</h3>


<ul>

`;



analytics.weakTopics
.forEach(topic=>{


resultHTML +=

`

<li>
${topic}
</li>

`;


});



resultHTML +=

`

</ul>



<h3>
ব্যক্তিগত পরামর্শ
(Personal Suggestions)
</h3>


<ul>

`;



analytics.suggestions
.forEach(item=>{


resultHTML +=

`

<li>
${item}
</li>

`;



});



resultHTML +=


`

</ul>



<hr>



<h3>
JEE / NEET Preparation Advice
</h3>


<p>

এই ফলাফল শুধুমাত্র এই Quiz-এর performance-এর উপর ভিত্তি করে তৈরি।
নিয়মিত revision এবং numerical practice করলে উন্নতি সম্ভব।

</p>



<h3>
Attempt Summary
</h3>


<p>

Attempted:
${attempted}

<br>

Correct:
${score}

<br>

Incorrect:
${incorrect}

</p>



</div>


`;




document
.getElementById(
"resultContent"
)
.innerHTML=resultHTML;



}
