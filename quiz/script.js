const quizzes = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Indian", "Southern", "Pacific"],
        answer: 3
    },
    {
        question: "What is the chemical symbol for water?",
        choices: ["H2O", "O2", "CO2", "H2SO4"],
        answer: 0
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
        answer: 2
    },
    {
        question: "What is the speed of light?",
        choices: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "50,000 km/s"],
        answer: 0
    },
    {
        question: "Which country is the largest by land area?",
        choices: ["China", "Canada", "United States", "Russia"],
        answer: 3
    },
    {
        question: "What is the hardest natural substance on Earth?",
        choices: ["Gold", "Iron", "Diamond", "Quartz"],
        answer: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
        answer: 2
    },
    {
        question: "What is the tallest mountain in the world?",
        choices: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        answer: 3
    },
    {
        question: "What is the primary gas found in the Earth's atmosphere?",
        choices: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
        answer: 2
    },
    {
        question: "What is the chemical formula for table salt?",
        choices: ["NaCl", "KCl", "HCl", "NaOH"],
        answer: 0
    },
    {
        question: "Which country hosted the 2016 Summer Olympics?",
        choices: ["China", "Brazil", "United Kingdom", "Japan"],
        answer: 1
    },
    {
        question: "What is the capital of Japan?",
        choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choices: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        answer: 0
    },
    {
        question: "Which planet has the most moons?",
        choices: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: 3
    },
    {
        question: "Who invented the telephone?",
        choices: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
        answer: 0
    },
    {
        question: "What is the longest river in the world?",
        choices: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: 1
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        choices: ["China", "South Korea", "Japan", "Thailand"],
        answer: 2
    },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: 1
    }
];

let currentQuiz = 0;
let score = 0;
let timeLeft = 30; // seconds for each quiz

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const quizElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const feedbackElement = document.createElement('div');
let timer;

function startQuiz() {
    startScreen.style.display = 'none';
    quizElement.style.display = 'block';
    resultElement.style.display = 'none';
    feedbackElement.style.display = 'none';
    score = 0;
    currentQuiz = 0;
    loadQuiz();
}

function loadQuiz() {
    clearTimeout(timer);
    timeLeft = 30;
    feedbackElement.innerHTML = '';
    const currentQuizData = quizzes[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    choicesElement.innerHTML = '';
    
    currentQuizData.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="choice" id="choice${index}" value="${index}">
                        <label for="choice${index}">${choice}</label>`;
        choicesElement.appendChild(li);
    });
    
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
        timeLeft--;
    }, 1000);
}

function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    const currentQuizData = quizzes[currentQuiz];
    
    if (selectedChoice) {
        const selectedValue = parseInt(selectedChoice.value);
        if (selectedValue === currentQuizData.answer) {
            score++;
            feedbackElement.innerHTML = `<p style="color: green;">Correct! The answer is ${currentQuizData.choices[currentQuizData.answer]}.</p>`;
        } else {
            feedbackElement.innerHTML = `<p style="color: red;">Wrong! The correct answer is ${currentQuizData.choices[currentQuizData.answer]}.</p>`;
        }
    } else {
        feedbackElement.innerHTML = `<p style="color: red;">Please select an answer.</p>`;
    }

    feedbackElement.style.display = 'block';
    choicesElement.appendChild(feedbackElement);

    currentQuiz++;
    if (currentQuiz < quizzes.length) {
        setTimeout(loadQuiz, 2000); // Delay loading the next question to allow time for feedback
    } else {
        setTimeout(endQuiz, 2000); // Delay ending the quiz to show final feedback
    }
}

function endQuiz() {
    clearInterval(timer);
    quizElement.style.display = 'none';
    resultElement.style.display = 'block';
    scoreElement.innerText = `${score} / ${quizzes.length}`;
    saveHighScore();
}

function saveHighScore() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', submitAnswer);
restartButton.addEventListener('click', startQuiz);

// Show the start screen
startScreen.style.display = 'block';
