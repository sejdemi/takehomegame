import React from 'react';
import Hand from '../../components/hand';
import './styles.css';

const User = (props) => {

    return (
      <div className="user-card-container" id="user-cards">
        <p>your cards</p>
        <Hand cards={props.cards}/>
      </div> 
    )
}

export default User;
