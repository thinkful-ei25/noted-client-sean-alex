import {
  METRIC_REQUEST,
  METRIC_SUCCESS,
  METRIC_ERROR,
  METRIC_SENT
} from '../actions/metric'

const initialState = {
  // numberOfSessions: 0,
  // currentAverage: 0,
  // runningAverage: 0,
  improvement: 0,
  loading: false,
  error: null
}

export default function reducer(state=initialState, action){
  if(action.type === METRIC_REQUEST){
    return{
      ...state,
      loading: true,
      error: null
    }
  }
  else if(action.type === METRIC_SUCCESS){
    return{
      // numberOfSessions: action.metric.numberOfSessions,
      // currentAverage: action.metric.currentAverage,
      // runningAverage: action.metric.runningAverage,
      improvement: action.metric.improvement,
      loading: false,
      error: null
    }
  }
  else if(action.type === METRIC_ERROR){
    return{
      ...state,
      loading: false,
      error: action.error
    }
  }
  else if(action.type === METRIC_SENT){
    return{
      ...state,
      loading: false,
      error: null
    }
  }
  return state;
}