class HangmanCanvas {
  constructor(secretWord) {
    this.img = new Image();
    this.img.src = "./images/gameover.png";

    this.imgs = [new Image(), new Image()];
    this.imgs[0].src = "./images/gameover.png";
    this.imgs[1].src = "./images/awesome.png";

    this.canvas = document.querySelector('#hangman');
    this.context = this.canvas.getContext('2d');

    this.secretWord = secretWord;
    const len = this.secretWord.length;
    this.placeholder = [... '_'.repeat(len)];
    this.wrongLetters = '';

    this.xPosErrorMessage = 100;
  }

  createBoard() {
    this.drawLines();
  }

  drawLines() {
    this.context.font = '56px Courier New';
    this.context.fillStyle = 'black'
    this.context.fillText(this.placeholder.join(' '), 100, 100);
  }

  writeCorrectLetter(index) {
    this.placeholder[index] = this.secretWord[index];
    this.createBoard();
  }

  writeWrongLetter(letter, errorsLeft) {
    this.drawHangman(errorsLeft);
    this.wrongLetters += letter;
    this.context.font = '56px Courier New';
    this.context.fillStyle = 'red'
    this.context.fillText(letter, this.xPosErrorMessage, 180);
    this.xPosErrorMessage += 40;
  }


  drawSingleLine(fromX, fromY, toX, toY) {
    this.context.moveTo(fromX, fromY);
    this.context.lineTo(toX, toY)
  }

  drawRightLeg() {
    this.drawSingleLine(300, 550, 320, 600);
  };
  drawLeftLeg() {
    this.drawSingleLine(300, 550, 280, 600);
  };
  drawRightArm() {
    this.drawSingleLine(300, 460, 320, 490);
  };
  drawLeftArm() {
    this.drawSingleLine(300, 460, 280, 490);
  };
  drawTorso() {
    this.drawSingleLine(300, 450, 300, 550);
  };

  drawHead() {
    this.context.beginPath()
    this.context.arc(300, 425, 25, 0, 2 * Math.PI)
    this.context.closePath()
    this.context.fillStyle = 'white'
    this.context.fill()
  };
  drawRope() {
    this.drawSingleLine(300, 300, 300, 400);
  };
  drawHorizontalBarBar() {
    this.drawSingleLine(150, 300, 300, 300);
  };
  drawVerticalBar() {
    this.drawSingleLine(150, 650, 150, 300);
  };

  drawBase() {
    this.context.moveTo(100, 700);
    this.context.lineTo(150, 650);
    this.context.lineTo(200, 700);
    this.context.closePath();
    this.context.fill();
  };

  drawHangman(errorsLeft) {
    const drawFunctions = [
      () => this.drawRightLeg(),
      () => this.drawLeftLeg(),
      () => this.drawRightArm(),
      () => this.drawLeftArm(),
      () => this.drawTorso(),
      () => this.drawHead(),
      () => this.drawRope(),
      () => this.drawHorizontalBarBar(),
      () => this.drawVerticalBar(),
      () => this.drawBase()
    ];
    if (errorsLeft >= 0 && errorsLeft < drawFunctions.length) {
      this.context.beginPath()
      this.context.fillStyle = 'black'
      drawFunctions[errorsLeft]();
      this.context.stroke()
    }
  }

  gameOver() {
    console.log(this.canvas.clientHeight);
    console.log(this.canvas.clientWidth);
    this.context.drawImage(this.imgs[0],
      this.canvas.width / 2 - this.imgs[0].width / 2,
      this.canvas.height / 2 - this.imgs[0].height / 2,
      this.imgs[0].width, this.imgs[0].height);
  }

  winner() {
    this.context.drawImage(this.imgs[1],
      this.canvas.width / 2 - this.imgs[1].width / 2,
      this.canvas.height / 2 - this.imgs[1].height / 2,
      this.imgs[1].width, this.imgs[1].height);
  }
}
