import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {loadAuthToken} from '../local-storage';

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


// async for retrieving question from server
export const fetchQuizItem = item => (dispatch, getState) => {
  dispatch(itemRequest());

  const authToken = loadAuthToken(); 

  return fetch(`${API_BASE_URL}/question`, { 
    method: 'GET', 
    headers: { 
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json()) 
    .then((data) => { 
      dispatch(itemSuccess(data));      
    })
    .catch(err => { 
      dispatch(itemError(err)); 
    });
}; 
