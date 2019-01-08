import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const SCORE_REQUEST = 'SCORE_REQUEST';
export const scoreRequest = () =>({
  type: SCORE_REQUEST
});

export const SCORE_SUCCESS = 'SCORE_SUCCESS';
export const scoreSuccess = (score) => ({
  type: SCORE_SUCCESS,
  score
});

export const SCORE_ERROR = 'SCORE_ERROR';
export const scoreError = (error) => ({
  type: SCORE_ERROR,
  error
});

export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const correctAnswer = () => ({
  type: CORRECT_ANSWER
});

export const INCORRECT_ANSWER = 'INCORRECT_ANSWER';
export const incorrectAnswer = () => ({
  type: INCORRECT_ANSWER
});

export const RESET_QUESTION = 'RESET_QUESTION';
export const resetQuestion = () => ({
  type: RESET_QUESTION
});

export const fetchUserScore = score => dispatch => {
  dispatch(scoreRequest());
  return fetch(`${API_BASE_URL}/score`, {
    method: 'GET',
    headers:{
      'content-type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => scoreSuccess(res.json()))
  .catch(err => scoreError(err))
}