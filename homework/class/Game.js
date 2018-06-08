class Game {
  constructor() {
    this.board = new Board(5, 5);
    this.winWord = "";
    /*asyncronously gets list of words and starts the game when the request is complete
    if there is only one parameter, then can in a short way call function*/
    this.httpRequest("words.json", result => {
      this.startNewGame(result); //callback - it will run the given function after the request completes
    });
  }

  startNewGame(wordList) {
    this.winWord = this.getRandomWord(wordList);
    this.board.writeWord(this.winWord[0]);
    console.log(this.winWord);
  }

  httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (typeof callback === "function") {
          return callback(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }

  getRandomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  guessWord(word) {
    var guess = document.getElementById("guess").value;
    if (this.inputValidation(guess)) {
      this.board.writeWord(guess);
      this.checkForWin(this.winWord, guess);
    }
  }

  inputValidation(guess) {
    var letters = /^[A-Za-z]+$/;
    if (!guess.match(letters) || guess.length !== 5) {
      alert("Needs to be a five letter word!");
      return false;
    }
    return true;
  }

  checkForWin(word, guess) {
    this.board.highlightLetters(guess, word);
    if (word == guess) {
      console.log("You win");
      alert("Congratulations, you win!");
    }
  }
}

/* show You Win text and You Lose text
need input validation */
