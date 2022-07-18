var startQuizEl = document.querySelector("#start-quiz-btn");
var startUpPageEl = document.querySelector("#start-up-page");
var questionPageEl = document.querySelector("#question-page");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var answersListEl = document.querySelectorAll("li");
var wrongOrRightEl = document.querySelector("#wrong-right-text");
var finalScoreEl = document.querySelector("#final-score");
var initialFormEl = document.querySelector("#initial-form");
var scoreEl = document.querySelector("#score");
var timeEl = document.querySelector("#time");
var initialsEl = document.querySelector("#initials");
var submitBtnEl = document.querySelector("#submit");
var viewScoresEl = document.querySelector("#view-scores");
var scorePageEl = document.querySelector("#score-page");
var scoreListEl = document.querySelector("#score-list");
var clearScoresEl = document.querySelector("#clear-scores");
var goBackEl = document.querySelector("#go-back");
var questionIndex = 0;
var correct = "Correct!";
var wrong = "Wrong!";
var time = 60;
var myTimer;
var collectionOfScores = [];
var questions = ["1. Commonly used data types DO NOT include:", "2. The condition in an if/else is enclosed with ___.",
                "3. Arrays in JavaScript can be used to store ____.", 
                "4. String values must be enclosed within ____ when being assigned to variables.",
                "5. A very useful tool used during development and debugging for printing content to the debugger is:"];


                // EVENT LISTENERS
// when 'start quiz' is clicked; it starts timer and begins asking the questions
startQuizEl.addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();

    // starts a timer for 60 seconds
    time = 60;
    myTimer = setInterval(function() {
        timeEl.textContent = time;
        scoreEl.textContent = time;
        if(time == 0){
            gameover();
            return;
        }
        time--;
    }, 1000);

    // hiding and displaying necessary elements
    wrongOrRightEl.innerHTML = "";
    startUpPageEl.style.display = "none";
    questionPageEl.style.display = "block";
    answersEl.style.display = "block";
    initialFormEl.style.display = "none";
    finalScoreEl.style.display = "none";

    // starts displaying all answer options
    for(var x = 0; x < 4; x++){
        answersListEl[x].style.display = "block";
    }
    askQuestion();
})

// when 'View high scores' is clicked on; it displays the score page
viewScoresEl.addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();

    // hides start up and question elements and displays the score page element
    startUpPageEl.style.display = "none";
    questionPageEl.style.display = "none";
    scorePageEl.style.display = "block";

    // displays the scores in greatest to smallest order
    showScores();
});

// when 'clear scores' is clicked; it sets collectionOfScores in the local 
// storage to null and the array to containing nothing
clearScoresEl.addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();
    localStorage.setItem("collectionOfScores", null);
    collectionOfScores = [];
    // any elements that were being displayed in the list are removed from the score list
    scoreListEl.innerHTML = "";
});

// when 'go back' is clicked; it goes back to displaying the start up page
goBackEl.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    startUpPageEl.style.display = "flex";
    scorePageEl.style.display = "none";
    startUpPageEl.style.justifyContent = "center";
});

// answer option #1
answersListEl[0].addEventListener("click", function(event) {
    event.preventDefault();
    // if option 1 is clicked and its on question 4; it is correct
    if (questionIndex === 3) {
        wrongOrRightEl.textContent = correct;
    }
    // if it's clicked on another question it is deemed wrong
    else {
        wrongOrRightEl.textContent = wrong;
        time -= 10;
        // and then if it is the last question; the quiz is considered over
        if (questionIndex === 4) {
            gameover();
            return;
        }
    }
    // questionIndex is incremented to move onto the next question
    questionIndex++;
    askQuestion();
})

// answer option #2
answersListEl[1].addEventListener("click", function(event) {
    event.preventDefault();
    // if option 2 is clicked and its on question 5; it is correct and the quiz is over
    if (questionIndex === 4) {
        wrongOrRightEl.textContent = correct;
        gameover();
        return;
    }
    else {
        wrongOrRightEl.textContent = wrong;
        time -= 10;
    }
    questionIndex++;
    askQuestion();
})

// answer option #3
answersListEl[2].addEventListener("click", function(event) {
    event.preventDefault();
    // if option 3 is clicked and its on question 1 or 2; it is correct
    if (questionIndex === 0 || questionIndex === 1) {
        wrongOrRightEl.textContent = correct;
    }
    else {
        wrongOrRightEl.textContent = wrong;
        time -= 10;
        if (questionIndex === 4) {
            gameover();
            return;
        }
    }
    questionIndex++;
    askQuestion();
})

// answer option #4
answersListEl[3].addEventListener("click", function(event) {
    event.preventDefault();
    // if option 4 is clicked and its on question 3; it is correct
    if (questionIndex === 2) {
        wrongOrRightEl.textContent = correct;
    }
    else {
        wrongOrRightEl.textContent = wrong;
        time -= 10;
        if (questionIndex === 4) {
            gameover();
            return;
        }
    }
    questionIndex++;
    askQuestion();
})

submitBtnEl.addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();

    // creates an object with intials and score attributes
    var score = {
        initials: initialsEl.value,
        score: time
    };

    // adds object to collectionOfScores array
    if (collectionOfScores != null){
        collectionOfScores.push(score);
    } else {
        collectionOfScores = [score];
    }

    // so that the local storage can hold it; it is converted to a string
    localStorage.setItem("collectionOfScores", JSON.stringify(collectionOfScores));

    // moves onto displaying the score page
    questionPageEl.style.display = "none";
    scorePageEl.style.display = "block";
    timeEl.textContent = "0";
    showScores();
})

                // FUNCTIONS
// sorts the array in order from top score to bottom score and then creates an li element in html 
// that is displayed and contains initials and score
function showScores() {
    scoreListEl.style.display = "block";
    scoreListEl.innerHTML = "";

    // checking if array is isn't null
    if(collectionOfScores != null){

        // sorts list in order by comparing the scores
        for(var i = 1; i < collectionOfScores.length; i++){
            for(var y = 0; y < i; y++){
                if(collectionOfScores[y].score < collectionOfScores[i].score){
                    var temp = collectionOfScores[y];
                    collectionOfScores[y] = collectionOfScores[i];
                    collectionOfScores[i] = temp;
                }
            }
        }

        // creates elements that can be added to the score list element
        for(var x = 0; x < collectionOfScores.length; x++){
            var li = document.createElement("li");
            li.setAttribute("class", "indiv-score");
            li.textContent = x+1 + ". " + collectionOfScores[x].initials + " - " + collectionOfScores[x].score;
            scoreListEl.appendChild(li);
        }
    }
}

// asks a question based on the questionIndex
function askQuestion() {
    questionEl.textContent = questions[questionIndex];
    giveAnswers();
}

// sets the given options
function giveAnswers() {
    if(questionIndex === 0) {
        answersListEl[0].textContent = "strings";
        answersListEl[1].textContent = "booleans";
        answersListEl[2].textContent = "alerts";
        answersListEl[3].textContent = "numbers";
    } else if (questionIndex === 1){
        answersListEl[0].textContent = "quotes";
        answersListEl[1].textContent = "curly brackets";
        answersListEl[2].textContent = "paranthesis";
        answersListEl[3].textContent = "square brackets";
    } else if (questionIndex === 2){
        answersListEl[0].textContent = "numbers and strings";
        answersListEl[1].textContent = "other arrays";
        answersListEl[2].textContent = "booleans";
        answersListEl[3].textContent = "all of the above";
    } else if (questionIndex === 3){
        answersListEl[0].textContent = "quotes";
        answersListEl[1].textContent = "curly brackets";
        answersListEl[2].textContent = "commas";
        answersListEl[3].textContent = "paranthesis";
    } else {
        answersListEl[0].textContent = "JavaScript";
        answersListEl[1].textContent = "console.log";
        answersListEl[2].textContent = "for loops";
        answersListEl[3].textContent = "terminal/bash";
    } 
}

// function that executes as soon as the window is opened
function init(){

    // hides every element but the start up page element
    questionPageEl.style.display = "none";
    for(var x = 0; x < 3; x++){
        answersListEl[x].style.display = "none";
    }
    finalScoreEl.style.display = "none";
    initialFormEl.style.display = "none";
    scorePageEl.style.display = "none";

    // parses the local storage variable collectionOfScores back to an array
    if((localStorage.getItem("collectionOfScores")) != "null"){
        collectionOfScores = JSON.parse(localStorage.getItem("collectionOfScores"));
    }
    else{
        collectionOfScores = [];
    }
    showScores();
}
init();


// hides the question elements and displays the initial form
function gameover() {
    clearInterval(myTimer);
    answersEl.style.display = "none";
    questionEl.textContent = "All done!";
    finalScoreEl.style.display = "block";
    initialFormEl.style.display = "block"
    scoreEl.textContent = time;
    timeEl.textContent = time;
    questionIndex = 0;
}