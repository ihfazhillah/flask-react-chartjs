import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from "react-redux";
import classNames from "classnames";
import Charts from "./Charts";
import {addData, toggleShowOriginal} from "./actions";


function App(props) {

  let btnClasses = classNames({
    btn: true,
    'btn-primary': true,
    disabled: props.sales.isProcessing
  })

  return (
    <div className="container-fluid m-5 mx-auto text-center">
      <h3>A Simple Chart App</h3>
      <p className="lead">Click button below to add New Chart</p>
      <button className={btnClasses} onClick={() => props.addData()}>Add Chart</button>
      <button className="btn btn-outline-info" onClick={() => props.toggleShowOriginal()}>Display {props.sales.showOriginal && "Multiplied" || "Original"}</button>
      <Charts/>
    </div>
  );
}

let withRedux = connect((state)=> ({sales: state.sales}), {addData, toggleShowOriginal})(App)

export default withRedux;
