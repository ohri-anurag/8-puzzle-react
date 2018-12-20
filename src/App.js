import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Intro from './Intro';
import swap from './Util'

let neighbours = [
  [1, 3],
  [0, 2, 4],
  [1, 5],
  [0, 4, 6],
  [1, 3, 5, 7],
  [2, 4, 8],
  [3, 7],
  [4, 6, 8],
  [5, 7]
];

class App extends Component {
  constructor(props) {
    super(props);
    let nums = randomize();
    this.state = {
      nums: nums,
      history: [],
      zero: nums.indexOf(0),
      moves: 0,
      isDone: false,
      intro: true
    };
  }


  // Check to see if the clicked element is a neighbour of zero
  handleClick(pos) {
    // console.log(pos);
    if (this.state.isDone)
      return;

    // Check to see if the neighbours of zero contain pos
    if (neighbours[this.state.zero].indexOf(pos) > -1) {
      // Swap the contents of these two cells
      let nums = this.state.nums.slice();
      swap(nums, this.state.zero, pos);
      this.setState((state, props) => ({
        history: state.history.concat([state.nums]),
        nums: nums,
        zero: pos,
        moves: state.moves + 1
      }));

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

  finishIntro() {
    this.setState({
      intro: false
    });
  }

  newGame() {
    let nums = randomize();
    this.setState({
      nums: nums,
      zero: nums.indexOf(0),
      moves: 0,
      isDone: false
    });
  }

  undo() {
    // Check if any moves have been made, or if user has already won
    if (!this.state.history.length || this.state.isDone)
      return;

    let lastState = this.state.history[this.state.history.length - 1];
    this.setState((state, props) => ({
      nums: lastState,
      history: state.history.slice(0, state.history.length - 1),
      zero: lastState.indexOf(0),
      moves: state.moves - 1
    }));
  }

  reset() {
    // Check if any moves have been made
    if (!this.state.history.length)
      return;

    let firstState = this.state.history[0];
    this.setState((state, props) => ({
      nums: firstState,
      history: [],
      zero: firstState.indexOf(0),
      moves: 0,
      isDone: false
    }));
  }

  render() {
    let appContents;
    if (this.state.intro) {
      // Show the intro section
      appContents = (
        <div className="App">
          <Intro finish={this.finishIntro.bind(this)} />
        </div>
      );
    } else {
      appContents = (
        <div className="App">
          <div className='boardAndButtons'>
            <div className='next' onClick={this.newGame.bind(this)}>{'New Puzzle'}</div>
            <Board
              nums={this.state.nums}
              onClick={this.handleClick.bind(this)}
              candidates={this.state.isDone ? [] : neighbours[this.state.zero]}
            />
            <div className='undoReset'>
              <div className='next' onClick={this.undo.bind(this)}>{'Undo'}</div>
              <div className='next' onClick={this.reset.bind(this)}>{'Reset'}</div>
            </div>
          </div>
          <div className="moves">{(this.state.isDone ? "You Won! " : "") + "Moves: " + this.state.moves}</div>
        </div>
      );
    }
    return appContents;
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

export default App;
