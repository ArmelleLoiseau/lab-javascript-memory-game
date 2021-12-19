class MemoryGame {
  constructor(cards) {
    this.cards = cards;

    this.pickedCards = [];
    this.guessedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }
  shuffleCards() {
    // should return undefined is argument is not passed
    if (!this.cards) return undefined;
    // shuffle method needs to be fixed
    else {
      const temp = [...this.cards];
      this.cards = [];
      let counter = temp.length;

      while (counter > 0) {
        let randomIndex = Math.floor(Math.random() * counter);
        this.cards.push(temp[randomIndex]);
        temp.splice(randomIndex, 1);
        counter--;
      }
      return this.cards;
    }
  }

  checkIfPair(card1, card2) {
    if (card1 === card2) {
      this.pairsGuessed++;
      this.pairsClicked += 1;
      return true;
    } else {
      this.pairsClicked += 1;
      return false;
    }
  }

  checkIfFinished() {
    if (this.pairsGuessed === 0) return false;
    else if (this.pairsGuessed < this.cards.length / 2) return false;
    else return true;
  }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;
