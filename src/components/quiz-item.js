import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuizItem} from '../actions/learn';
import Guess  from './guess';


export class QuizItem extends React.Component{
  componentDidMount() {
    this.props.dispatch(fetchQuizItem());
  }

  render(){
    return(
        <div className="quiz-item">          
          <img className="quiz-pic" src={this.props.question.img} alt=''></img>
          <Guess />
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