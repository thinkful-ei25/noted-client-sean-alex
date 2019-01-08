import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuizItem} from '../actions/learn';
// import {fetchUserScore}from '../actions/score';
import Guess  from './guess';


export class QuizItem extends React.Component{
  componentDidMount() {
    this.props.dispatch(fetchQuizItem());
    // this.props.dispatch(fetchUserScore());
  }

  render(){
    return(
        <div className="quiz-item">
          <p>Question: {this.props.question.question}</p>
          <img src={this.props.question.image} alt=''></img>
          <Guess />
          <div className='user-score'>
            <h3>Today's Stats</h3>
            <p>Total Correct: {this.props.totalCorrect}</p>
            <p>Total Viewed: {this.props.totalViewed} </p>
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