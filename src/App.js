import React, { Component } from "react";
import NavBar from "./NavBar";
import Card from "./Card";
import cards from "./cardMetaData";
import "./App.css";

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: shuffle(cards), noClick: false };

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map(card => ({
      ...card,
      cardState: CardState.HIDING
    }));
    cards = shuffle(cards);
    this.setState({ cards });
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if (idsToChange.includes(card.id)) {
          return {
            ...card,
            cardState: newCardState
          };
        }
        return card;
      });
    };

    const foundCard = this.state.cards.find(card => card.id === id);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter(
      card => card.cardState === CardState.SHOWING
    );

    const ids = showingCards.map(card => card.id);

    if (
      showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor
    ) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === CardState.MATCHING) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      noClick = true;

      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1 seconds
          this.setState({ cards: hidingCards, noClick: false });
        }, 1000);
      });
      return;
    }
    this.setState({ cards, noClick });
  }

  render() {
    const cards = this.state.cards.map(card => {
      return (
        <Card
          key={card.id}
          backgroundColor={card.backgroundColor}
          onClick={() => this.handleClick(card.id)}
          showing={card.cardState !== CardState.HIDING}
        />
      );
    });

    return (
      <div className="App">
        <NavBar onNewGame={this.handleNewGame} />
        <main>{cards}</main>
      </div>
    );
  }
}

export default App;
