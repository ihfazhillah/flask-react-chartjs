import Client from "./client";


export function getInitialData(){
 return (dispatch, getState) => {
  dispatch({type: 'toggleProcessing'})
  new Client().getAllData().then(result => {
   dispatch({type: 'getData', data: result})
  })
 }
}

export function addData(){
 return (dispatch, getState) => {
  dispatch({type: 'toggleProcessing'})
  new Client().addData().then(result => {
   dispatch({type: 'addData', data: result})
  })
 }
}



