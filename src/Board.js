import React from 'react';
import Square from './Square';
import './Board.css';

function Board(props) {
  let i, squares = [];
  for (i=0; i<9; ++i) {
    // Candidate squares should have a different background
    squares.push(
      <Square
        value={props.nums[i]}
        key={i}
        id={i}
        className={props.candidates.indexOf(i) > -1 ? 'candidate' : (props.nums[i] ? 'normal' : 'zero')}
        onClick={props.onClick}
      />
    );
  }

  let rows = [];
  for (i=0; i<3; ++i) {
    rows.push(
      <div className="row" key={"row" + i}>{squares.slice(i*3, (i+1)*3)}</div>
    );
  }

  return (
    <div className="board">{rows}</div>
  );
}

export default Board;
