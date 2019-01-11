import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuizItem} from '../actions/learn';
import Guess  from './guess';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { resetSession } from '../actions/score';
import { endUserSession } from '../actions/metric';


export class QuizItem extends React.Component{
  componentDidMount() {
    this.props.dispatch(fetchQuizItem());
  }

  logOut() {
    this.props.dispatch(endUserSession());
    this.props.dispatch(resetSession());
    this.props.dispatch(clearAuth());
    clearAuthToken();  
  }

  render(){
    return(
      <div className='quiz-interface'>
        <button className='logout-button' onClick={() => this.logOut()}>Log out</button>
        <div className="quiz-item">          
          <img className="quiz-pic" src={this.props.question.img} alt='Guess the symbol!'></img>
          <Guess />
        </div>
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

export default requiresLogin()(connect(mapStateToProps)(QuizItem))