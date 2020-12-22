import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import {getNewDeck, getNewCard} from './utils/blackjackapi';
import Hand from './components/hand';
import House from './containers/house';
import User from './containers/user';
import Buttons from './containers/buttons'
import EndGame from './containers/endGame';
import { Cards } from './variables/cardNames';
import "../stylesheets/style.css"

class App extends Component {
  constructor() {
    super();
    this.state = {
      deckID: null,
      userHand: [],
      houseHand: [],
      userScore: 0,
      houseScore: 0,
      remainingCards: 0,
      winner: null,
    };
    this.calculateFirstHand = this.calculateFirstHand.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.calculateWinner = this.calculateWinner.bind(this);
    this.hit = this.hit.bind(this);
    this.stand = this.stand.bind(this);
    this.createNewGame = this.createNewGame.bind(this);
    this.renderWinner = this.renderWinner.bind(this);
  }

  calculateFirstHand(userHand, houseHand) {
    const userScore = this.calculateScore(userHand);
    const houseScore = this.calculateScore(houseHand);
    this.setState({
      userScore,
      houseScore
    })
  }

  calculateScore(hand) {
    let aces = hand.filter(element => element.value === Cards.ACE);

    let sum = hand.reduce((sum, card) => {
      if (card.value === Cards.Jack || card.value === Cards.QUEEN || card.value === Cards.KING) {
        return sum + 10;
      } else if (card.value === Cards.ACE) {
        return sum;
      } else {
        return sum + Number(card.value);
      }
    }, 0)

    if (aces.length > 0) {
      if (aces.length === 1 && sum < 10) {
        sum += 11;
      } else {
        sum += aces.length;
      }
    } 

    return sum;
  }

  calculateWinner(userScore, houseScore) {
    if ((userScore === 21 && houseScore !== 21) || (userScore > houseScore) && (userScore < 21)) {
      this.setState({winner: 'user'});
    } else if ( (userScore > 21) || (userScore === houseScore) || (userScore < 21 && userScore < houseScore)) {
      this.setState({winner: 'house'})
    }
  }

  createNewGame() {
    getNewDeck().then( (response) => {
      const houseHand = response.cards.slice(0, 2);
      const userHand = response.cards.slice(2);
      
      this.calculateFirstHand(houseHand, userHand);

      this.setState({
        deckID: response.deck_id,
        userHand,
        houseHand,
        userScore: 0,
        housScore: 0,
        remainingCards: response.remaining,
        winner: null,
      })
    });
  }

  hit(){
    getNewCard(this.state.deckID).then((response) => {
      const userHand = JSON.parse(JSON.stringify(this.state.userHand));
      userHand.push(...response.cards)
      const userScore = this.calculateScore(userHand);
      
      this.setState({
        userHand,
        userScore,
        remainingCards: response.remaining,
        winner: userScore <= 21 ? null : 'house',
      });
    });

  }

  stand() {
    this.calculateWinner(this.state.userScore, this.state.houseScore);
  }

  renderWinner() {
    return (
      <EndGame winner={this.state.winner === 'user'} createNewGame={this.createNewGame} />
    );
  }

  renderCardContainer() {
    return (
      <div>
        <House cards={this.state.houseHand}/>
        <User cards={this.state.userHand}/>
          { this.state.winner === null ? 
            <Buttons hit={this.hit} stand={this.stand}/>
            :
            this.renderWinner()
          }
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state?.houseHand?.length > 0 ? 
          this.renderCardContainer()
        : 
        <>
          <p>Welcome to Virtual Blackjack.  Let's play!</p>
          <button onClick={this.createNewGame} className="button" id="start-game-button">
            new game
          </button>
        </>
        }
      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('root'));