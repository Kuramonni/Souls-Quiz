// Questions and answers
const quizQuestions = [
    {
        question: "What is the name of the ring that allows you to traverse the Abyss unharmed?",
        answers: [
            "Wolf Ring",
            "Darkmoon Seance Ring",
            "Covenant of Artorias",
            "Ring of Favor and Protection"
        ],
        correct: 2
    },
    {
        question: "What is the name of this location?",
        image: "img/ash.jpg", // Update this path as needed
        answers: [
            "Valley of Drakes",
            "Kiln of the First Flame",
            "New Londo Ruins",
            "Ash Lake"
        ],
        correct: 3
    },
    {
        question: "Who sells the Master key -item?",
        answers: [
            "Domhnall of Zena",
            "Undead Merchant",
            "Oswald of Carim",
            "Patches the Hyena"
        ],
        correct: 0
    },
    {
        question: "Who is this boss?",
        image: "img/gwyndolin.jpg", // Update this path as needed
        answers: [
            "Gwyn, Lord of Cinder",
            "Gwynevere, Princess of Sunlight",
            "Dark Sun Gwyndolin",
            "Crossbreed Priscilla"
        ],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const questionImg = document.getElementById("question-img");
    const buttons = document.querySelectorAll(".answer-btn");

    // Display the current question
    questionElement.textContent = quizQuestions[currentQuestionIndex].question;

    // Check if there is an image for the current question
    if (quizQuestions[currentQuestionIndex].image) {
        questionImg.src = quizQuestions[currentQuestionIndex].image;
        questionImg.style.display = "block"; // Show the image
        questionImg.style.maxWidth = "100%"; // Ensure the image doesn't exceed container width
        questionImg.style.height = "auto"; // Maintain aspect ratio
    } else {
        questionImg.style.display = "none"; // Hide the image if not present
    }

    buttons.forEach((button, index) => {
        button.textContent = quizQuestions[currentQuestionIndex].answers[index];
        button.classList.remove('correct', 'incorrect');
        button.disabled = false; // Re-enable buttons for the new question
    });

    // Hide the "Next" button initially
    document.getElementById("next-btn").style.display = "none";
}

function selectAnswer(selectedAnswerIndex) {
    const correctAnswerIndex = quizQuestions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll(".answer-btn");

    // Highlight the correct answer
    buttons[correctAnswerIndex].classList.add("correct");

    // If the player selected the right answer
    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
    } else {
        // Highlight the wrong answer if the player got it wrong
        buttons[selectedAnswerIndex].classList.add("incorrect");
    }

    // Disable all buttons after the answer is selected
    buttons.forEach(button => button.disabled = true);

    // Display the "Next" button to move to the next question
    document.getElementById("next-btn").style.display = "block";

    // Show the current score
    document.getElementById("score").textContent = `Score: ${score}/${quizQuestions.length}`;
}

function nextQuestion() {
    currentQuestionIndex++;

    // If there are more questions, load the next one
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        // End of quiz - show final score
        const quizContainer = document.getElementById("quiz");
        quizContainer.innerHTML = `
        <img src="img/bonfire.png" alt="Dark Souls Logo" style="width: 30%; height: auto;">
            <h2>Quiz Complete!</h2>
            <p>Your final score is ${score}/${quizQuestions.length}</p>
            <button onclick="restartQuiz()">Restart Quiz</button>
            <button onclick="window.location.href = 'index.html'">Back to Home</button>
        `;
    }
}

function restartQuiz() {
    // Reload the page to reset the quiz
    location.reload();
}

// Load the first question when the page loads
window.onload = loadQuestion;
