import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

let salesInitState = {data: [], isProcessing: false}

function sales(state = salesInitState, action){
  switch (action.type) {
    case  'getData':
      return {data: action.data, isProcessing: false}
    case 'toggleProcessing':
      return {...state, isProcessing: !state.isProcessing}
    case 'addData':
      let newData = [...state.data, action.data]
      return {data: newData, isProcessing: false}
    default:
      return state
  }
}


let store = createStore(combineReducers({sales: sales}), applyMiddleware(thunk))

export default store
