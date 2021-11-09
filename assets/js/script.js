var questions = [
    {
        question: "How old is Tavian?",
        answers: ["23", "21", "25", "19"],
        correct: "21",
    }, 
    {
        question: "When is Tavian's Birthdate?",
        answers: ["Oct 9th", "July 23rd", "January 1st", "None of the above"],
        correct: "None of the above",
    }, 
    {
        question: "What is Tavian's favorite Video Game right now?",
        answers: ["Call Of Duty", "Apex Legends", "Rust", "GTA 5"],
        correct: "Apex Legends",
    }, 
    {
        question: "How many pets does Tavian have?",
        answers: ["3", "5", "0", "none of the above"],
        correct: "3",
    }, 
    {
        question: "Tavian's favorite hobby that he has.",
        answers: ["Video Games", "Eating", "Coding", "Skiing"],
        correct: "Skiing",
    }
]

var questionBox = document.getElementById("questionsPage");
var answersEl = document.getElementById("answers");
var timeEl = document.getElementById('time');
var startBtn = document.getElementById('startbtn');
startBtn.onclick = startQuiz;
var submitHighscore = document.getElementById('initialsBtn')

let currentQuestion = 0
var time = 30;
var timer;
var initials = "";
var score = '';
var answer = 0;

// start quiz function

function startQuiz() {
    var firstPage = document.getElementById("firstPage");
    firstPage.setAttribute("class", "hide")

    questionBox.removeAttribute("class");

    timer = setInterval(timeHandler, 1000)

    runQuiz();
}



// runs the quiz function
function runQuiz() {
    var currentQuestionData = questions[currentQuestion];

    var questionText = document.getElementById("questionText");
    questionText.textContent = currentQuestionData.question
    

    answersEl.innerHTML = "";

    currentQuestionData.answers.forEach(function(answer, i){

        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "answers");
        answerBtn.setAttribute("value", answer);

        answerBtn.textContent = i + 1 + ". " + answer;

        answerBtn.onclick = clickHandler;
        answersEl.append(answerBtn);
    })


    

}
// runs the timer function

function timeHandler() {
    time--;
    timeEl.textContent = time;

    if(time === 0){
        endQuiz();
    }
}
// Handles the buttons and when you click //
function clickHandler(){
    if(this.value !== questions[currentQuestion].correct){
        time -= 10;
    } else {
        answer++;
    }

    if(time <=0){
        endQuiz();
    }

    currentQuestion++;

    if(currentQuestion === questions.length){
        endQuiz();
    } else {
        runQuiz();
    }

}
//
function endQuiz() {
    
    clearInterval(timer);

    var endPage = document.getElementById("endPage");
    endPage.removeAttribute("class");

    questionBox.setAttribute("class", "hide");

    var finalscore = answer

    var results = document.getElementById("results");
    results.textContent = finalscore

    var submitHighscore = document.getElementById("initialsBtn")
    submitHighscore.onclick = saveHighScore;

}


var saveHighScore = function () {
    var initials = submitHighscore

    if(initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            initials: "",
            score: answer
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));


    }
}


submitHighscore.onsubmit = saveHighScore;