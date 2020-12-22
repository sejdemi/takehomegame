import React from 'react';
import './styles.css';


const Buttons = (props) => {

    return (
      <div className="button-container">
        <button onClick={props.hit} className="button" id="hit-button">hit</button>
        <button onClick={props.stand} className="button" id="stand-button">stand</button>
      </div>
    )
}

export default Buttons;
