import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import {correctAnswer, incorrectAnswer, resetQuestion, sendUserScore} from '../actions/score';
import { fetchQuizItem } from '../actions/learn';

export class Guess extends React.Component{
  onSubmit(e){
    const answer = {
      guess: e.target.guess.value
    };
    // console.log(answer);
    this.props.dispatch(sendUserScore(answer)).then(() => this.scoremodifier());
  }

  scoremodifier(){
    if(this.props.correct === true){
      this.props.dispatch(correctAnswer());
    }
    else if(this.props.correct === false) {
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
      guess = (<form className='guess-area' onSubmit={(e) => {
        e.preventDefault();
        this.onSubmit(e);
      }}>
              <label htmlFor='guess'>Enter your guess:</label>
              <input type="text" name="guess" id="guess"/>
              <button>Submit</button>
            </form>)
    }
  
    if(this.props.correct === true){
      guess = (<div className='correct-feedback'>
              <p>CORRECT!</p>
              <button onClick={() => this.nextQuestion()}>Next</button>
            </div>);
    }
    if(this.props.correct === false){
      guess = (<div className='incorrect-feedback'>
              <p>INCORRECT :(</p>
              <p>The correct answer is {this.props.question.name}</p>
              <button onClick={() => this.nextQuestion()}>Next</button>
            </div>);
    }
    return(
      <div>
        {guess}
      </div>
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