import React from 'react';
import './Square.css';

function Square(props) {
  return (
    <div 
      className={"square " + props.className}
      onClick={() => props.onClick(props.id)}
    >
      <span className="squareText">{props.value}</span>
    </div>
  );
}

export default Square;
