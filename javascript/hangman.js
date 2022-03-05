class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    const rdmIndex = Math.floor(Math.random() * this.words.length);
    return this.words[rdmIndex];
  }

  checkIfLetter(keyCode) {
    if (typeof keyCode === 'number') {
      return keyCode >= 65 && keyCode <= 90;
    }
    return false;
  }

  checkClickedLetters(letter) {
    return !this.guessedLetters.includes(letter)
      && !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    if (this.checkClickedLetters(letter)) {
      this.letters.push(letter);
    }
    return this.checkGameOver();
  }

  checkGameOver() {
    return this.errorsLeft === 0;
  }

  checkWinner() {
    for (let i = 0; i < this.secretWord.length; i++) {
      if (!this.guessedLetters.includes(this.secretWord[i])) {
        return false;
      }
    }
    return true;
  }
}

// GAME VARIABLES --------------------------------------------------------------

let hangman;
let gameStarted = false;

const startGameButton = document.getElementById('start-game-button');


// GAME FUNCTIONS --------------------------------------------------------------

function finishGame(outcome) {
  if (outcome === 'lost') {
    console.log('LOST');
    hangmanCanvas.gameOver();
  } else if (outcome === 'win') {
    console.log('WIN');
    hangmanCanvas.winner();
  }
  document.removeEventListener('keydown', manageNewGuess);
}

function manageRightGuess(letter, pos) {
  const isGameWon = hangman.addCorrectLetter(letter);
  do {
    hangmanCanvas.writeCorrectLetter(pos);
    pos++;
  } while ((pos = hangman.secretWord.indexOf(letter, pos)) != -1)
  hangmanCanvas.writeCorrectLetter(letter);
  if (isGameWon) {
    finishGame('win');
  }

}

function manageWrongGuess(letter) {
  const gameOver = hangman.addWrongLetter(letter);
  hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
  if (gameOver) {
    finishGame('lost');
  }
}

function manageNewGuess(event) {
  const letter = event.key;
  if (hangman.checkIfLetter(event.keyCode) && hangman.checkClickedLetters(letter)) {
    let pos = hangman.secretWord.indexOf(letter);
    pos === -1 ? manageWrongGuess(letter) : manageRightGuess(letter, pos);
  }
}

function clickHandler(event) {
  startGameButton.removeEventListener('click', clickHandler);
  hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

  // HINT (uncomment when start working on the canvas portion of the lab)

  // ⚠️ commented this block of provided code since the subject asks to have
  // the random word picked in constructor, making this step useless and
  // confusion.
  // hangman.secretWord = hangman.pickWord();
  console.log(hangman.secretWord);
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
  document.addEventListener('keydown', manageNewGuess);
}

if (startGameButton) {
  startGameButton.addEventListener('click', clickHandler);
}

