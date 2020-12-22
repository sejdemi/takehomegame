import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api/deck/'

const getNewDeck = () => {
    const SHUFFLE_URL = `${BASE_URL}new/draw/?count=4`;
    return new Promise((resolve, reject) => {
        axios.get(SHUFFLE_URL)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.log(`error`)
            reject(error);
        });
    });
}

const getNewCard = (deckID) => {
    const DRAW_URL = `${BASE_URL+deckID}/draw/?count=1`;
    return new Promise((resolve, reject) => {
        axios.get(DRAW_URL)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.log(`error`)
            reject(error);
        });
    });
}




export {getNewDeck, getNewCard}