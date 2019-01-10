import {
  SCORE_REQUEST, 
  SCORE_SUCCESS, 
  SCORE_ERROR,
  // CORRECT_ANSWER,
  // INCORRECT_ANSWER,
  RESET_QUESTION,
  RESET_SESSION
} from '../actions/score'

const initialState = {
  totalCorrect: 0,
  totalViewed: 0,
  correct: null,
  score: 0, 
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  if(action.type === SCORE_REQUEST){
    return {
      ...state,
      loading: true,
      error: null
    }
  }
  else if(action.type === SCORE_SUCCESS){
    return {
      ...state,
      correct: action.feedback.isValid,
      score: action.feedback.score, 
      loading: false,
      error: null
    }
  }
  else if(action.type === SCORE_ERROR){
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }
  // else if(action.type === CORRECT_ANSWER){

  //   return {
  //     totalCorrect: state.totalCorrect + 1,
  //     totalViewed: state.totalViewed + 1,
  //     correct: true,
  //     score: score, 
  //     loading: false,
  //     error: null
  //   }
  // }
  // else if(action.type === INCORRECT_ANSWER){
  //   return {
  //     ...state,
  //     totalViewed: state.totalViewed + 1,
  //     correct: false,
  //     score:  action.feedback.score, 
  //     loading: false,
  //     error: null
  //   }
  // }
  else if(action.type === RESET_QUESTION){
    return {
      ...state,
      correct: null,
      score: null, 
      loading: false,
      error: null
    }
  }
  else if(action.type === RESET_SESSION){
    return {
      totalCorrect: 0,
      totalViewed: 0,
      correct: null,
      score: null, 
      loading: false,
      error: null
    }
  }
  return state;
}