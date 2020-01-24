import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

let salesInitState = {data: [], isProcessing: false, multiplier: {pie: 1, bar: 1}, showOriginal: false}

function sales(state = salesInitState, action){
  switch (action.type) {
    case  'getData':
      return {...state, data: action.data, isProcessing: false}
    case 'toggleProcessing':
      return {...state, isProcessing: !state.isProcessing}
    case 'addData':
      let newData = [...state.data, action.data]
      return {...state, data: newData, isProcessing: false}
    case 'getMultiplier':
      // the data from backend is list, we need first of it
      return {...state, multiplier: action.data[0]}
    case 'toggleShowOriginal':
      return {...state, showOriginal: !state.showOriginal}
    default:
      return state
  }
}


let store = createStore(combineReducers({sales: sales}), applyMiddleware(thunk))

export default store
