import React from 'react';
import './styles.css';

const Card = (props) => {
    const imgURL = props.card.image;

    return (
        <li>
            <img src={imgURL} alt="card-display" className="card-display"/>
        </li>
    );
};

export default Card;