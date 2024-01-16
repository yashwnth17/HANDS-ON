const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "shark", correct: false },
            { text: "blue whale", correct: true },
            { text: "elephant", correct: false },
            { text: "giraffe", correct: false },
        ],
    },
    {
        question: "which is the smallest country in the world?",
        answers: [
            { text: "vatican city", correct: true },
            { text: "bhutan", correct: false },
            { text: "nepal", correct: false },
            { text: "sri lanka", correct: false },
        ],
    },
    {
        question: "which is the largest desert in the world?",
        answers: [
            { text: "kalahari", correct: false },
            { text: "gobi", correct: false },
            { text: "sahara", correct: false },
            { text: "antarctica", correct: true },
        ],
    },
    {
        question: "which is the smallest continent in the world?",
        answers: [
            { text: "asia", correct: false },
            { text: "australia", correct: true },
            { text: "arctic", correct: false },
            { text: "africa", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const notificationElement = document.getElementById("notification");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    showNotification(`You answered question ${currentQuestionIndex + 1}!`);

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");

        Array.from(answerButtons.children).forEach((button) => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showNotification(message) {
    notificationElement.innerHTML = message;
    notificationElement.style.display = "block";

    
    setTimeout(() => {
        notificationElement.style.display = "none";
    }, 1500); 
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();