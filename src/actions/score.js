import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {loadAuthToken} from '../local-storage'; 

export const SCORE_REQUEST = 'SCORE_REQUEST';
export const scoreRequest = () =>({
  type: SCORE_REQUEST
});

export const SCORE_SUCCESS = 'SCORE_SUCCESS';
export const scoreSuccess = (feedback) => ({
  type: SCORE_SUCCESS,
  feedback
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

export const fetchUserMetric = () => (dispatch) => {
  dispatch(scoreRequest());

  const authToken = loadAuthToken(); 

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

export const sendUserScore = guess => (dispatch) => {
  dispatch(scoreRequest());
  const authToken = loadAuthToken();
  return fetch(`${API_BASE_URL}/score`, {
    method: 'POST',
    headers:{
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(guess)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => { 
    dispatch(scoreSuccess(data))
  })
  .catch(err => dispatch(scoreError(err)))

}