const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
const resultsContainer = document.querySelector('#score');
// const scoreElement = document.querySelector('#score h2');
const pairsClickedElement = document.querySelector('#pairs-clicked');
const pairsGuessedElement = document.querySelector('#pairs-guessed');

function pickingCards(event) {
  // target the cards that have been clicked on
  let pickedCard = event.currentTarget;
  // add cards to the array of picked cards and change their classes to make them visible
  memoryGame.pickedCards.push(pickedCard);
  memoryGame.pickedCards.forEach((card) => {
    card.classList.add('turned');
  });

  // When there are two elements in the array of picked cards, let's check if it's a pair
  if (memoryGame.pickedCards.length === 2) {
    // check the return value of the function checkIfPair
    if (
      !memoryGame.checkIfPair(
        memoryGame.pickedCards[0].getAttribute('data-card-name'),
        memoryGame.pickedCards[1].getAttribute('data-card-name')
      )
    ) {
      // if the function checkIfPair returns false, reposition the cards back-end front after half a secodnd
      // update the onscreen counter
      setTimeout(() => {
        memoryGame.pickedCards.forEach((card) => {
          card.classList.remove('turned');
        });
      }, 500);
      pairsClickedElement.textContent = `${memoryGame.pairsClicked}`;
    } else {
      //  if the function checkIfPair returns true
      //  update the onscreen counters
      //  add the block class to the pair so they stay visible
      pairsGuessedElement.textContent = `${memoryGame.pairsGuessed}`;
      pairsClickedElement.textContent = `${memoryGame.pairsClicked}`;
      memoryGame.guessedCards.push(memoryGame.pickedCards[0]);
      memoryGame.guessedCards.push(memoryGame.pickedCards[1]);
      memoryGame.guessedCards[0].classList.add('blocked');
      memoryGame.guessedCards[1].classList.add('blocked');
    }
    //  empty the array of picked cards
    setTimeout(() => {
      memoryGame.pickedCards.splice(0, 2);
    }, 501);

    // check if the game is finised
    if (memoryGame.checkIfFinished()) {
      let finalResultElement = document.createElement('p');
      finalResultElement.textContent = 'Congrats, you won !';
      resultsContainer.appendChild(finalResultElement);
    }
  }
}

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.shuffleCards();
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', pickingCards);
  });
});
