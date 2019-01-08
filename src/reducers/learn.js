import {
  ITEM_REQUEST, 
  ITEM_SUCCESS, 
  ITEM_ERROR
} from '../actions/learn'

const initialState = {
  question: 'hello',
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  if(action.type === ITEM_REQUEST){
    return {
      ...state,
      loading:true,
      error: null
    }
  }
  else if(action.type === ITEM_SUCCESS){
    return {
      ...state,
      question: action.item,
      loading: false,
      error: null
    }
  }
  else if(action.type === ITEM_ERROR){
    return {
      ...state,
      question: null,
      loading: null,
      error: action.error
    }
  }
  return state;
}