import React, {Component} from 'react';
import './Intro.css'

class Intro extends Component {
  constructor(props) {
    super(props);
    this.screens = [
      (
        <div className="Intro">
          <div className='introTitle' onClick={() => this.next()}>{"8 Puzzle"}</div>
        </div>
      ),
      (
        <div className="Intro">
          <div className='imageDiv'>
            <img src={process.env.PUBLIC_URL + './Puzzle.png'} alt='Unsolved Puzzle' />
            <img src={process.env.PUBLIC_URL + './Arrow.png'} alt='After Solving' />
            <img src={process.env.PUBLIC_URL + './Solved.png'} alt='Solved Puzzle' />
          </div>
          <div className="text">{'The aim of this game is to convert the original puzzle to the solved version.'}
          </div>
          <div className='next' onClick={() => this.next()}>{'Next'}</div>
        </div>
      ),
      (
        <div className="Intro">
          <div className='imageDiv'>
            <img src={process.env.PUBLIC_URL + './Candidates.png'} alt='Click on highlighted candidates' />
          </div>
          <div className="text">{'At every move, some cells will be highlighted in green. You can click on one of these cells to swap this with the zero cell which is in gray.'}
          </div>
          <div className='next' onClick={props.finish}>{'Finish'}</div>
        </div>
      )
    ];
    this.state = {
      screenIndex: 0
    };
  }

  next() {
    this.setState((state, props) => ({
      screenIndex: state.screenIndex + 1
    }));
  }

  render() {
    return this.screens[this.state.screenIndex];
  }
}

export default Intro;
