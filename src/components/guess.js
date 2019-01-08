import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import {correctAnswer, incorrectAnswer, resetQuestion} from '../actions/score';
import { fetchQuizItem } from '../actions/learn';

export class Guess extends React.Component{
  onSubmit(e){
    const answer = {
      guess: e.target.guess.value
    };
    if(answer.guess === this.props.question){
      this.props.dispatch(correctAnswer());
    }
    else{
      this.props.dispatch(incorrectAnswer());
    }
  }

  nextQuestion(){
    this.props.dispatch(resetQuestion());
    this.props.dispatch(fetchQuizItem());
  }
  
  render(){
    let guess;
    if(this.props.correct === null){
      guess = (<div className='guess-area'>
              <label htmlFor='guess'>Enter your guess:</label>
              <input type="text" name="guess" id="guess"/>
              <button>Submit</button>
            </div>)
    }
  
    if(this.props.correct === true){
      guess = (<div className='correct-feedback'>
              <p>CORRECT!</p>
              <button onClick={() => this.nextQuestion()}>Next</button>
            </div>);
    }
    if(this.props.correct === false){
      guess = (<div className='correct-feedback'>
              <p>INCORRECT :(</p>
              <p>The correct answer is {this.props.question}</p>
              <button onClick={() => this.nextQuestion()}>Next</button>
            </div>);
    }
    return(
      <form onSubmit={(e) => {
        e.preventDefault();
        this.onSubmit(e);
      }}>
        {guess}
      </form>
    );
  }
  
}

const mapStateToProps= state => ({
  loggedIn: state.auth.currentUser !== null,
  question: state.learn.question,
  correct: state.score.correct,
  totalCorrect: state.score.totalCorrect,
  totalViewed: state.score.totalViewed
});

export default requiresLogin()(connect(mapStateToProps)(Guess))