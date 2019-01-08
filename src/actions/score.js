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

export const RESET_SESSION = 'RESET_SESSION';
export const resetSession = () => ({
type: RESET_SESSION
});

export const fetchUserMetric = metric => (dispatch, getState) => {
  dispatch(scoreRequest());
  const authToken = getState().authToken;
  return fetch(`${API_BASE_URL}/metric`, {
    method: 'GET',
    headers:{
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => dispatch(normalizeResponseErrors(res)))
  .then(res => dispatch(scoreSuccess(res.json())))
  .catch(err => dispatch(scoreError(err)))
}

export const sendUserScore = score => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/score`, {
    method: 'POST',
    headers:{
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({score})
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => dispatch(scoreError(err)))
}