import React from 'react';
import Hand from '../../components/hand';
import './styles.css';


const House = (props) => {

    return (
      <div className="house-card-container" id="house-cards">
        <p>house cards</p>
        <Hand cards={props.cards}/>
      </div>
    )
}

export default House;
