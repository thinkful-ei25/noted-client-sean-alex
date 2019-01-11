import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {loadAuthToken} from '../local-storage'; 


export const METRIC_REQUEST = 'METRIC_REQUEST';
export const metricRequest = () => ({
  type: METRIC_REQUEST
});

export const METRIC_SUCCESS = 'METRIC_SUCCESS';
export const metricSuccess = metric => ({
  type: METRIC_SUCCESS,
  metric
});

export const METRIC_ERROR = 'METRIC_ERROR';
export const metricError = error => ({
  type: METRIC_ERROR,
  error
});

export const METRIC_SENT = 'METRIC_SENT';
export const metricSent = () => ({
  type: METRIC_SENT
});

// async to retrive metric data of current session and past sessionss
export const fetchMetricData = data => (dispatch, getState) => {
  dispatch(metricRequest());
  const authToken = loadAuthToken();

  return fetch(`${API_BASE_URL}/metric`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(metricSuccess(data)))
  .catch(err => dispatch(metricError(err)));
}

// async initializes session recording on server side
export const startUserSession = data => (dispatch, getState) => {
  dispatch(metricRequest());
  const authToken = loadAuthToken();

  return fetch(`${API_BASE_URL}/metric/startSession`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => dispatch(metricError(err)));
}

// async notifies server that user has ended session and server can now log/calculate information
export const endUserSession = data => (dispatch, getState) => {
  dispatch(metricRequest());
  const authToken = loadAuthToken();

  return fetch(`${API_BASE_URL}/metric/endSession`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => dispatch(metricError(err)));
}

