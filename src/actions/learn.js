import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const ITEM_REQUEST = 'ITEM_REQUEST';
export const itemRequest = () => ({
  type: ITEM_REQUEST  
});

export const ITEM_SUCCESS = 'ITEM_SUCCESS';
export const itemSuccess = (item) =>({
  type: ITEM_SUCCESS,
  item 
});

export const ITEM_ERROR = 'ITEM_ERROR';
export const itemError = (error) => ({
  type: ITEM_ERROR,
  error
});

export const fetchQuizItem = item => dispatch => {
  dispatch(itemRequest());
  return fetch(`${API_BASE_URL}/question`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(itemSuccess(data)))
  .catch(err => dispatch(itemError(err)))
}
