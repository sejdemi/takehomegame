import React from 'react';
import Card from '../card';
import './styles.css';

const Hand = (props) => {
    const cards = props.cards.map((card) => {
        return <Card card={card} key={card.code}/>
    });

    return (
        <ul className="card-list">
            {cards}
        </ul>
    )
}

export default Hand;