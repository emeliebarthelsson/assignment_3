// array of quiz objects
const questions = [
    {
        question: "What is Sweden's largest island?",
        answers: ["Gotland", "Öland", "Orust"],
        correctAnswer: "Gotland"
    }, 
    {
        question: "Which city does the Göta älv flow through?",
        answers: ["Malmö", "Gothenburg", "Uppsala"],
        correctAnswer: "Gothenburg"
    }, 
    {
        question: "What is the deepest lake in Sweden?",
        answers: ["Vänern", "Mälaren", "Hornavan"],
        correctAnswer: "Hornavan"
    }, 
    {   question: "In which province is Kebnekaise, Sweden's highest mountain, located?",
        answers: ["Lappland", "Härjedalen", "Jämtland"],
        correctAnswer: "Lappland", 
    },
    {
        question: "What is the largest province in Sweden by area?",
        answers: ["Värmland", "Lappland", "Småland"],
        correctAnswer: "Lappland"
    }, 
    {
        question: "Which of these cities is located the farthest north?",
        answers: ["Östersund", "Umeå", "Kiruna"],
        correctAnswer: "Kiruna"
    }, 
    {
        question: "Which sea borders Sweden to the east?",
        answers: ["North Sea", "Baltic Sea", "Atlantic Ocean"],
        correctAnswer: "Baltic Sea"
    }, 
    {
        question: "Which is Sweden's longest river?",
        answers: ["Dalälven", "Klarälven", "Göta älv"],
        correctAnswer: "Klarälven"
    }, 
    {
        question: "What is the name of the largest lake located between Stockholm and Uppsala?",
        answers: ["Vänern", "Mälaren", "Vättern"],
        correctAnswer: "Mälaren"
    }, 
    {
        question: "Which city is Sweden's third largest by population?",
        answers: ["Uppsala", "Malmö", "Linköping"],
        correctAnswer: "Malmö"
    }
];

// set initial index and value
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let selectedAnswer = null;

// function for question counter
function questionCounter() {
    const counterElement = document.querySelector(".counter");
    counterElement.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
}

// function to show the question and answer options
function showQuestion() {
    const questionElement = document.querySelector(".question");
    const answerButtons = document.querySelectorAll(".answer-button");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
    });

    // update question counter
    questionCounter();
};

// starts the quiz with first question
showQuestion()

// event listener for answer
document.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        selectedAnswer = event.target.textContent;
    });
});

// function to show the next question (or result), save users answer and increase score if correct answer
function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // save users answer in the empty array
    userAnswers.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: selectedAnswer
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    // change last button to submit
    if (currentQuestionIndex === questions.length - 1) {
      document.querySelector(".primary-button").textContent = "Submit";
    }
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

    // reset for next question
    selectedAnswer = null;
};

// calling next question 
document.querySelector(".primary-button").addEventListener("click", nextQuestion);

function showResult() {
    // add restart option
    document.querySelector("a").textContent = "Restart Sweden Quiz";
    
    // hide elements 
    document.querySelector(".counter").style.display = "none";
    document.querySelector(".question").style.display = "none";
    document.querySelectorAll(".answer-button").forEach((button) => {
        button.style.display = "none";
    });
    document.querySelector(".primary-button").style.display = "none";

    // create elements
    const resultHeading = document.createElement("h2");
    const resultElement = document.createElement("div");
    const reviewButton = document.createElement("button");
    reviewButton.classList.add("primary-button");
    reviewButton.textContent = "Review";
    reviewButton.style.marginTop = "10rem";

    // create result options
    if (score > 3 && score < 8) {
        resultHeading.textContent = `Good job!`;
        resultElement.textContent = `You got ${score} / ${questions.length} correct answers 🥳`;
    } else if (score >= 8) {
        resultHeading.textContent = `Wohoo!`;
        resultElement.textContent = `You got ${score} / ${questions.length} correct answers 🥳`;
    } else {
        resultHeading.textContent = `You don't like to read huh?`;
        resultElement.textContent = `You got ${score} / ${questions.length} correct answers 🤪`;
    }

    // add result in the containers 
    document.querySelector(".question-container").appendChild(resultHeading);
    document.querySelector(".button-container").append(resultElement, reviewButton);

    // add event listener to review answers
    reviewButton.addEventListener("click", reviewAnswers);
};

// function to show question, users answer and correct answer
function reviewAnswers() {
    // hide elements
    document.querySelector(".question-container").style.display = "none"
    document.querySelector(".button-container").style.display = "none"

    const container = document.querySelector(".container");
    container.textContent = "";

    // create elements and append title
    const reviewTitle = document.createElement("h2");
    reviewTitle.textContent = "Review your answers";
    container.appendChild(reviewTitle);

    // loop through users answers
    userAnswers.forEach((item, index) => {
        // create elements
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-container");

        const questionText = document.createElement("p");
        questionText.classList.add("review__question");

        const answerText = document.createElement("p");
        answerText.style.color = item.userAnswer === item.correctAnswer ? "green" : "red";

        const correctAnswerText = document.createElement("p");

        // create content
        questionText.textContent = `${item.question}`;
        answerText.textContent = `Your answer: ${item.userAnswer ? item.userAnswer : "No answer"}`;
        correctAnswerText.textContent = `Correct answer: ${item.correctAnswer}`;

        // add content
        reviewItem.append(questionText, answerText, correctAnswerText);
        container.appendChild(reviewItem);
    });
};