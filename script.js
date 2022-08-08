var main = function (input) {
  var playerHand = [];
  var newDeck = makeDeck();
  var wildCard = newDeck[getRandomIndex(52)];
  var shuffledDeck = shuffleCards(newDeck);
  playerHand.push(shuffledDeck.shift());
  var results = `<br> Wildcard: ${wildCard.name + wildCard.suit}
  <br> Player's card(s): ${playerHand[0].name + playerHand[0].suit}`;
  for (var counter = 0; counter < input - 1; counter += 1) {
    var currentCard = shuffledDeck.shift();
    if (currentCard.rank < playerHand[0].rank) {
      playerHand.unshift(currentCard);
    } else playerHand.push(currentCard);
    results = results + `, ${currentCard.name + currentCard.suit}`;
  }

  //Assign best card for player
  humanCard = playerHand[0];
  computerCard = shuffledDeck.shift();
  results = results + `<br> computer ${computerCard.name + computerCard.suit}`;
  if (playerHand.includes(wildCard)) {
    return `You win wild card, ${results}`;
  } else if (computerCard == wildCard) {
    return `You lose wild card, ${results}`;
  } else if (humanCard.rank == computerCard.rank) {
    return `Draw ${results}`;
  } else if (humanCard.rank == 12) {
    return `You win ${results}`;
  } else if (computerCard.rank == 12) {
    return `You lose ${results}`;
  } else if (humanCard.rank < computerCard.rank) {
    return `You win ${results}`;
  } else return `You lose ${results}`;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//Make Deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};
