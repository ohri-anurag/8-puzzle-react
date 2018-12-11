import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import swap from './Util'

class App extends Component {
  constructor(props) {
    super(props);
    let nums = randomize();
    this.state = {
      nums: nums,
      zero: nums.indexOf(0),
      moves: 0,
      isDone: false
    };
  }

  // Check to see if the clicked element is a neighbour of zero
  handleClick(pos) {
    // console.log(pos);
    if (this.state.isDone)
      return;

    // Calculate the row and col for clicked element
    let row = Math.floor(pos/3), col = pos%3;
  
    // Also, calculate the row and col for zero element
    let rz = Math.floor(this.state.zero/3), cz = this.state.zero%3;

    // Neighbours either have the same row, or the same col
    if ((row === rz && (col === cz+1 || col === cz-1)) ||
        (col === cz && (row === rz+1 || row === rz-1))
    ) {
      // Swap the contents of these two cells
      let nums = this.state.nums.slice();
      swap(nums, this.state.zero, pos);
      this.setState({
        nums: nums,
        zero: pos,
        moves: this.state.moves + 1
      });

      // Check if puzzle is done
      let i;
      for (i=0; i<8; ++i) {
        if (nums[i] !== i+1) {
          break;
        }
      }
      console.log(i);
      if (i === 8) {
        this.setState({
          isDone: true
        });
      }
    }
  }

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div className="App">
        <Board
          nums={this.state.nums}
          onClick={this.handleClick.bind(this)}
        />
        <div className="moves">{(this.state.isDone ? "You Won! " : "") + "Moves: " + this.state.moves}</div>
      </div>
    );
  }
}

function randomize() {
  let nums = [1,2,3,4,5,6,7,8,0];
  for (let i=0; i<nums.length; ++i) {
    let j = Math.floor(Math.random()*nums.length);
    swap(nums, i, j);
  }

  // Check if the current puzzle is solvable
  let invCount = 0;
  for (let i=0; i<nums.length-1; ++i) {
    for (let j=i+1; j<nums.length; ++j) {
      if (nums[i] && nums[j] && nums[i] < nums[j])
        invCount++;
    }
  }

  let i, j;
  if (invCount%2 === 1) {
    // This is an unsolvable problem
    // Swap two non-zero entries
    if (nums[0] === 0) {
      [i, j] = [1, 2];
    } else if (nums[1] === 0) {
      [i, j] = [0, 2];
    } else {
      [i, j] = [0, 1];
    }
    swap(nums, i, j);
  }

  return nums;
}

function displacement(i, j) {
  let ri = Math.floor(i/3), ci = i%3;
  let rj = Math.floor(j/3), cj = j%3;
  return Math.abs(ri - rj) + Math.abs(ci - cj);
}

export default App;
