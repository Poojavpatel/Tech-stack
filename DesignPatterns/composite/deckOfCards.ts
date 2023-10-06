abstract class Card {
  abstract display(): void;
}

class PlayingCard extends Card {
  constructor(private rank: string, private suit: string) {
    super();
  }

  display(): void {
    console.log(`${this.rank} of ${this.suit}`);
  }
}

class DeckOfCards extends Card {
  private cards: (Card | DeckOfCards)[] = [];

  addItem(item: Card | DeckOfCards): void {
    this.cards.push(item);
  }

  display(): void {
    for (const item of this.cards) {
      /* method called recursively incase of deck of cards */
      item.display();
    }
  }
}

// Usage
const aceOfSpades = new PlayingCard("Ace", "Spades");
const twoOfHearts = new PlayingCard("2", "Hearts");

const deck1 = new DeckOfCards();
deck1.addItem(aceOfSpades);
deck1.addItem(twoOfHearts);

const deck2 = new DeckOfCards();
deck2.addItem(new PlayingCard("King", "Diamonds"));
deck2.addItem(new PlayingCard("10", "Clubs"));

deck1.addItem(deck2);

deck1.display();
/* 
Ace of Spades
2 of Hearts
King of Diamonds
10 of Clubs
*/
