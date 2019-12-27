class Game {
  constructor() {
    this.matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.count = 1;
    this.winner = "";
    this.player1 = 0;
    this.player2 = 0;
    this.round = 0;
    this.roundFineshed = false;
    this.firstPlay = true;
    this.XO = { true: "X", false: "O" };
    // document.getElementById("winner").innerHTML = this.winner;
    // document.getElementById("round").innerHTML = this.round;

    document.getElementById("nb-player1").innerHTML = this.player1;
    document.getElementById("nb-player2").innerHTML = this.player2;
    this.init();
  }
  // init the matrix : all the value to 0 , the counter , the

  init() {
    this.matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    for (let i = 0; i < 9; i++) {
      var element = document.getElementById(i);
      element.innerHTML = "";
      //   element.addEventListener("click", () => {
      //     this.click(i);
      //   });
    }
    this.count = 1;
    this.winner = "";
    this.roundFineshed = false;
    document.getElementById("winner").innerHTML = this.winner;
    document.getElementById("round").innerHTML = this.round;
  }

  //on every click , this metode will be invoke :
  //check if the round finished
  //invoke updateMatrix() and checjk the result if there is a winner
  click(val) {
    if (!this.matrix[Math.floor(val / 3)][val % 3] && !this.roundFineshed) {
      var result = this.updateMatrix(val);

      if (result === 1) {
        this.winner = "Player1";
        this.player1++;
        this.round++;
        this.firstPlay = true;
        this.roundFineshed = true; // finish the round
      } else if (result === 0) {
        this.winner = "Player2";
        this.player2++;
        this.round++;
        this.firstPlay = false;
        this.roundFineshed = true;
      } else if (result === -1) {
        this.round++;
        this.roundFineshed = true;
      }
      //update the html
      document.getElementById("winner").innerHTML = this.winner;
      document.getElementById("round").innerHTML = this.round;
      document.getElementById("nb-player1").innerHTML = this.player1;
      document.getElementById("nb-player2").innerHTML = this.player2;
    }
  }
  // check the given row
  checkRow(row) {
    var sum = 0;
    var val = 0;
    for (var i = 0; i < 3; i++) {
      val = this.matrix[row][i];
      sum = sum + val;
    }
    if (sum === 3) return 1; // if their is 3 'x'  align returned 1
    if (sum === -3) return 0;
    return -1;
  }
  //check the column
  checkCol(col) {
    var sum = 0;
    for (var i = 0; i < 3; i++) {
      var val = this.matrix[i][col];
      sum = sum + val;
    }

    if (sum === 3) return 1;
    if (sum === -3) return 0;
    return -1;
  }
  checkDiagonals() {
    var col = 2;
    var col2 = 0;
    var sum1 = 0;
    var sum2 = 0;
    for (let row = 0; row < 3; row++) {
      var val1 = this.matrix[row][col];
      var val2 = this.matrix[col2][row];
      sum1 += val1;
      sum2 += val2;
      col--;
      col2++;
    }
    if (sum1 === 3 || sum2 === 3) return 1;
    if (sum1 === -3 || sum2 === -3) return 0;
    return -1;
  }
  hasWiner(row, col) {
    var rowChek = this.checkRow(row);
    var colChek = this.checkCol(col);
    var diagonalsCheck = this.checkDiagonals();

    if (rowChek === 1 || colChek === 1 || diagonalsCheck === 1) return 1; //if the player 1 win
    if (!rowChek || !colChek || !diagonalsCheck) return 0; //if the player 2 win
    return -1;
  }

  updateMatrix(val) {
    var play = this.XO[this.firstPlay]; //if true 'X' else 'O'//true=player1
    var row = Math.floor(val / 3);
    var col = val % 3;
    if (!this.firstPlay) {
      play = this.XO[this.firstPlay];
      this.matrix[row][col] = -1; //assign -1 to 'O'
      this.firstPlay = !this.firstPlay;
    } else {
      this.matrix[row][col] = 1; //assign 1 to 'X'
      this.firstPlay = !this.firstPlay;
    }
    this.count++; // number of time

    document.getElementById(val).innerHTML = play; //update the dom

    var result = this.hasWiner(row, col);
    if (result === 1 || result === 0) {
      return result;
    }
    // if count attempt 10 does mean no one win
    if (this.count === 10) {
      return -1;
    }
  }
}
var newGame = new Game();
