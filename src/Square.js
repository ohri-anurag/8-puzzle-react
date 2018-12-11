import React from 'react';
import './Square.css';

function Square(props) {
  return (
    <div 
      className="square"
      onClick={props.onClick}
    >
      <span className="squareText">{props.value}</span>
    </div>
  );
}

export default Square;
