const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const movesElement = document.getElementById('moves');
const levelElement = document.getElementById('level');

// Update image paths to point to the images folder
const images = [
    'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg', 
    'images/image5.jpg', 'images/image6.jpg', 'images/image7.jpg', 'images/image8.png'
];

let cards = [];
let flippedCards = [];
let moves = 0;
let level = 1;
let matches = 0;
let timer;
let time = 0;

function startGame() {
    generateCards();
    shuffleCards();
    renderCards();
    startTimer();
}

function generateCards() {
    const cardValues = Array.from({ length: level }, (_, i) => i);
    cards = cardValues.concat(cardValues);
}

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function renderCards() {
    gameBoard.innerHTML = '';
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = index;
        card.dataset.image = images[value];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    const card = this;
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    card.style.backgroundImage = `url('${card.dataset.image}')`;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
        moves++;
        movesElement.textContent = `Moves: ${moves}`;
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        if (matches === level) {
            if (level < 8) {
                level++;
                levelElement.textContent = `Level: ${level}`;
                resetGame();
            } else {
                alert('Congratulations! You won the game!');
                resetGame(true);
            }
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.style.backgroundImage = '';
            card2.style.backgroundImage = '';
        }, 1000);
    }
    flippedCards = [];
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        timerElement.textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

function resetGame(fullReset = false) {
    if (fullReset) {
        level = 1;
        moves = 0;
        time = 0;
        matches = 0;
        clearInterval(timer);
        startTimer();
        movesElement.textContent = 'Moves: 0';
        timerElement.textContent = 'Time: 00:00';
    } else {
        matches = 0;
    }
    flippedCards = [];
    generateCards();
    shuffleCards();
    renderCards();
}

startGame();
