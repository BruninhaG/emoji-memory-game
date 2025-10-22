const emojis = ['😋','🤡','😎','😺','👽','🚲','🦄','🐾','😻','🥳','🤖','🐸'];
let cards = [...emojis, ...emojis, ...emojis];

cards = cards.slice(0, 36);
cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
  gameBoard.innerHTML = '';
  cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerHTML = '❓';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flipped');
  this.innerHTML = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetTurn();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.innerHTML = '❓';
    secondCard.innerHTML = '❓';
    resetTurn();
  }, 800);
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById('resetButton').addEventListener('click', () => {
  cards.sort(() => Math.random() - 0.5);
  createBoard();
});

createBoard();