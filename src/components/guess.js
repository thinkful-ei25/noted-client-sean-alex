import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {resetSession, sendUserScore, resetQuestion} from '../actions/score'
import {endUserSession} from '../actions/metric';
import { fetchQuizItem } from '../actions/learn';

export class Guess extends React.Component{
  
  //manage score on back-end and manage data in state

  constructor(props){ 
    super(props); 
    this.totalCorrect = 0; 
    this.totalViewed = 0; 
  }

  onSubmit(e){
    const answer = {
      guess: e.target.guess.value
    };

    this.props.dispatch(sendUserScore(answer))
  }

  nextQuestion(){
    this.props.dispatch(resetQuestion());
    this.props.dispatch(fetchQuizItem());
  }

  logScore(){
    console.log('Dashboard')
    this.props.dispatch(endUserSession());
    this.props.dispatch(resetSession());
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
      this.totalViewed++; 
      this.totalCorrect++; 
      guess = (<div className='correct-feedback'>
              <p><b>CORRECT!</b></p>
              <p>SCORE: <b>{this.props.score}</b> </p>              
              <button onClick={() => this.nextQuestion()}>Next</button>
            </div>);
    }
    if(this.props.correct === false){
      this.totalViewed++; 
      guess = (<div className='incorrect-feedback'>
              <p><b>INCORRECT :(</b></p>
              <p>SCORE: <b>{this.props.score}</b></p>
              <p>The correct answer is {this.props.question.name}</p>
              <button onClick={() => this.nextQuestion()}>Next</button>
            </div>);
    }
    return(
      <div>
        {guess}
        <div className='user-score'>
          <h3>Today's Stats</h3>
          <p>Total Correct: {this.totalCorrect}</p>
          <p>Total Viewed: {this.totalViewed} </p>
        </div>
        <Link to ='/dashboard'><button onClick={() => this.logScore()}>Dashboard</button></Link>
      </div>
    );
  }
  
}

const mapStateToProps= state => ({
  loggedIn: state.auth.currentUser !== null,
  question: state.learn.question,
  correct: state.score.correct,
  score: state.score.score, 
  totalCorrect: state.score.totalCorrect,
  totalViewed: state.score.totalViewed
});

export default requiresLogin()(connect(mapStateToProps)(Guess))