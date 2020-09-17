/**
 * !using classes instead of modules and factories
 * !might come back later to use modules after researching
 */

let container = document.querySelector('.container');
let results = document.querySelector('.results-text');
let form = document.querySelector('form');

//create game's grid
for (let i = 0; i < 9; i++) {
  let cell = document.createElement('div');
  cell.classList.add('game-cell');
  cell.setAttribute('data-attribute', i);
  container.appendChild(cell);
}

class Gameboard {
  constructor() {
    this.gameArray = ['', '', '', '', '', '', '', '', ''];
  }

  clearBoard() {
    cells.forEach((cell) => {
      cell.textContent = '';
    });
  }

  renderBoard() {
    this.clearBoard();
    let index = 0;
    cells.forEach((cell) => {
      let innerCell = document.createElement('p');
      innerCell.classList.add('cell-content');
      innerCell.textContent = this.gameArray[index];
      cell.appendChild(innerCell);
      index = index + 1;
    });
  }

  newGame() {
    this.clearBoard();
    this.gameArray.fill('');
  }
}

class Player {
  constructor(id, mark) {
    this.id = id;
    this.mark = mark;
  }
}

class Game {
  constructor() {
    this.gameboard = new Gameboard();
    this.players = [];
    this.winner = '';
  }

  checkIfDraw() {
    if (!this.gameboard.gameArray.includes('')) {
      console.log('END OF GAME');
      return true;
    }
  }

  checkHorizontal() {
    for (let i = 0; i < 9; i += 3) {
      if (
        this.gameboard.gameArray[i] != '' &&
        this.gameboard.gameArray[i + 1] != '' &&
        this.gameboard.gameArray[i + 2] != ''
      ) {
        if (
          this.gameboard.gameArray[i] == this.gameboard.gameArray[i + 1] &&
          this.gameboard.gameArray[i + 1] == this.gameboard.gameArray[i + 2]
        ) {
          if (this.gameboard.gameArray[i] === 'X')
            this.winner = this.players[0].id;
          if (this.gameboard.gameArray[i] === 'O')
            this.winner = this.players[1].id;
          return true;
        }
      }
    }
    return false;
  }

  checkVertical() {
    for (let i = 0; i < 9; i++) {
      if (
        this.gameboard.gameArray[i] != '' &&
        this.gameboard.gameArray[i + 3] != '' &&
        this.gameboard.gameArray[i + 6] != ''
      ) {
        if (
          this.gameboard.gameArray[i] == this.gameboard.gameArray[i + 3] &&
          this.gameboard.gameArray[i + 3] == this.gameboard.gameArray[i + 6]
        )
          if (this.gameboard.gameArray[i] === 'X')
            this.winner = this.players[0].id;
        if (this.gameboard.gameArray[i] === 'O')
          this.winner = this.players[1].id;
        return true;
      }
    }
    return false;
  }

  checkDiagonalMain() {
    if (
      this.gameboard.gameArray[0] != '' &&
      this.gameboard.gameArray[4] != '' &&
      this.gameboard.gameArray[8] != ''
    ) {
      if (
        this.gameboard.gameArray[0] == this.gameboard.gameArray[4] &&
        this.gameboard.gameArray[4] == this.gameboard.gameArray[8]
      )
        if (this.gameboard.gameArray[0] === 'X')
          this.winner = this.players[0].id;
      if (this.gameboard.gameArray[0] === 'O') this.winner = this.players[1].id;
      return true;
    }
    return false;
  }

  checkDiagonalSecondary() {
    if (
      this.gameboard.gameArray[2] != '' &&
      this.gameboard.gameArray[4] != '' &&
      this.gameboard.gameArray[6] != ''
    ) {
      if (
        this.gameboard.gameArray[2] == this.gameboard.gameArray[4] &&
        this.gameboard.gameArray[4] == this.gameboard.gameArray[6]
      )
        if (this.gameboard.gameArray[2] === 'X')
          this.winner = this.players[0].id;
      if (this.gameboard.gameArray[2] === 'O') this.winner = this.players[1].id;
      return true;
    }
    return false;
  }

  checkForWinner() {
    console.log(this.checkHorizontal(), 'HORIZONTAL');
    console.log(this.checkVertical(), 'VERTICAL');
    console.log(this.checkDiagonalMain(), 'main');
    console.log(this.checkDiagonalSecondary(), 'sec');
    if (
      this.checkHorizontal() ||
      this.checkVertical() ||
      this.checkDiagonalMain() ||
      this.checkDiagonalSecondary()
    )
      return true;

    return false;
  }

  showResults(haveAWinner) {
    if (haveAWinner === false) results.textContent = `No winner, it is a tie`;
    if (haveAWinner === true)
      results.textContent = `${this.winner.toString()} wins!`;
    console.log(this.winner.toString());
  }

  isValidMove(pos) {
    if (this.gameboard.gameArray[pos] !== '') return false;
    else return true;
  }

  move(pos, player) {
    if (this.isValidMove(pos)) this.gameboard.gameArray[pos] = player.mark;
    this.gameboard.clearBoard();
    this.gameboard.renderBoard();
    if (this.checkForWinner()) {
      this.showResults(true);
      this.gameboard.newGame();
    }
    if (this.checkIfDraw()) {
      this.showResults(false);
      this.gameboard.clearBoard();
      this.gameboard.newGame();
    }
  }
}

let game = new Game();
let currentPlayer;
//GET PLAYER INFO
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const playerOneName = e.target.querySelectorAll('input')[0].value;
  const playerTwoName = e.target.querySelectorAll('input')[1].value;
  game.players.push(new Player(playerOneName, 'X'));
  game.players.push(new Player(playerTwoName, 'O'));
  currentPlayer = game.players[0];
  console.log(game.players);
});

console.log(game.players);

console.log(currentPlayer);
//QUERY SELECTOR AND EVENT LISTENER FOR GAME-CELL
console.log(document.body);
let cells = document.querySelectorAll('.game-cell');
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    game.move(cell.getAttribute('data-attribute'), currentPlayer);

    if (currentPlayer === game.players[0]) currentPlayer = game.players[1];
    else currentPlayer = game.players[0];
  });
});

console.log(game.gameboard, game.players);

game.gameboard.renderBoard();
