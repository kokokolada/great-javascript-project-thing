class Board {
  constructor(numCols, numRows) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.words = [];
    this.create();
  }

  create() {
    var table = document.getElementById("myTable");

    for (var r = 0; r < this.numRows; r++) {
      var row = document.createElement("tr");
      table.appendChild(row);
      this.words.push([]);

      for (var c = 0; c < this.numCols; c++) {
        var column = document.createElement("td");
        column.innerHTML = ".";
        row.appendChild(column);
        this.words[r].push(column);
      }
    }
  }

  writeWord(word) {
    var emptyWord = this.words.find(
      w => w.find(l => l.innerHTML.indexOf(".") >= 0) !== undefined
    );

    if (emptyWord == undefined) {
      console.log("Out of guesses!");
      alert("You lost!");
      return;
    }

    for (var i = 0; i < word.length; i++) {
      emptyWord[i].innerHTML = word[i];
    }
  }

  highlightLetters(guess, winWord) {
    var guessedWords = this.words.filter(
      word =>
        word.find(letter => letter.innerHTML.indexOf(".") >= 0) ===
        undefined /* will go through every word and filter words from the board that have letters on them */
    );
    var lastWord = guessedWords[guessedWords.length - 1]; /* get the last one */

    for (var i = 0; i < guess.length; i++) {
      if (guess[i] === winWord[i]) {
        console.log(guess[i] + " turns green");
        lastWord[i].classList.add("found");
        continue;
      }

      for (var j = 0; j < winWord.length; j++) {
        if (i !== j && guess[i] === winWord[j]) {
          console.log(guess[i] + " turns yellow");
          lastWord[i].classList.add("exist");
          continue;
        }
      }
    }
  }
}
