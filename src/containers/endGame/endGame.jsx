import React from 'react';
import './styles.css';


const EndGame = (props) => {

    return (
      <div className="end-container">
        {props.winner ? 
          <p id="win-text">you win!</p> :
          <p id="lose-text">you lose!</p>}
        <button onClick={props.createNewGame} className="button" id="hit-button">reset</button>
      </div>
    )
}

export default EndGame;
