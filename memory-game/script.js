const gameContainer = document.getElementById("game");
const winMessage = document.getElementById("win-message");

// 6 image pairs = 12 cards total
const cardsArray = [
  "1.jfif", "2.jfif", "3.jfif", "4.jfif", "5.jfif", "6.jfif"
];
let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs

// Shuffle
cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedCards = 0;

cards.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const frontFace = document.createElement("div");
  frontFace.classList.add("front");

  const backFace = document.createElement("img");
  backFace.classList.add("back");
  backFace.src = image;

  card.appendChild(frontFace);
  card.appendChild(backFace);
  gameContainer.appendChild(card);

  card.addEventListener("click", () => flipCard(card, image));
});

function flipCard(card, image) {
  if (flippedCards.length < 2 && !card.classList.contains("flip")) {
    card.classList.add("flip");
    flippedCards.push({ card, image });

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  const [first, second] = flippedCards;

  if (first.image === second.image) {
    matchedCards += 2;
    flippedCards = [];
    if (matchedCards === cards.length) {
      winMessage.classList.remove("hidden");
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove("flip");
      second.card.classList.remove("flip");
      flippedCards = [];
    }, 800);
  }
}
