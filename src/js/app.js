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

let currentQuestionIndex = 0;
let score = 0;

function questionCounter() {
    const counterElement = document.querySelector(".counter");
    counterElement.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
}

function showQuestion() {
    const questionElement = document.querySelector(".question");
    const answerButtons = document.querySelectorAll(".answer-button");

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
    });

    questionCounter();
};

showQuestion()

document.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        selectedAnswer = event.target.textContent;
    });
});

function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
        score++;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

document.querySelector(".primary-button").addEventListener("click", nextQuestion);

function showResult() {
    document.querySelector(".counter").style.display = "none";
    document.querySelector(".question").style.display = "none";
    document.querySelectorAll(".answer-button").forEach((button) => {
        button.style.display = "none";
    });
    document.querySelector(".primary-button").style.display = "none";

    const resultHeading = document.createElement("h2");
    const resultElement = document.createElement("div");

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

    document.querySelector(".question-container").appendChild(resultHeading);
    document.querySelector(".button-container").appendChild(resultElement);
};