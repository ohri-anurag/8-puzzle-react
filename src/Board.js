import React from 'react';
import Square from './Square';
import './Board.css';

function Board(props) {
  let rows = [], counter = 0;
  for (let i=0; i<3; ++i) {
    let row = [];
    for (let j=0; j<3; ++j) {
      let handleClick = (function(){
        let i = counter;
        return function() {
          props.onClick(i);
        };
      })();
      row.push(
        <Square
          value={props.nums[counter]}
          key={counter}
          onClick={handleClick}
        />
      );
      counter++;
    }
    rows.push(
      <div className="row" key={"row" + i}>{row}</div>
    );
  }
  return (
    <div className="board">{rows}</div>
  );
}

export default Board;
