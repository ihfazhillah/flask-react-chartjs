import React from "react";
import {connect} from "react-redux";
import {getInitialData, getMultiplierData} from "./actions";
import Chart from "chart.js"


class OurChart extends React.Component{
  constructor(props) {
    super(props);

    this.barChart = React.createRef()
    this.pieChart = React.createRef()
    this.theData = this.theData.bind(this)
  }
  componentDidMount() {

    let {showOriginal, multiplier} = this.props

    // make sure that we have original value for each
    let pieMultiplier = parseInt(multiplier.pie) || 1
    let barMultiplier = parseInt(multiplier.bar) || 1

    if (showOriginal){
      var pieList = this.props.saleData.items.map(value => value.count)
      var barList = this.props.saleData.items.map(value => value.count)
    } else{
      var pieList = this.props.saleData.items.map(value => value.count * pieMultiplier)
      var barList = this.props.saleData.items.map(value => value.count * barMultiplier)
    }


    let labels = this.props.saleData.items.map(value => value.name)
    let pie = this.pieChart.current.getContext("2d")
    let {data: piedata, option: pieoptions} = this.theData(pieList, labels, this.props.saleData.title);
    this.pie = new Chart(pie, {
      type: 'pie',
      data: piedata,
      options: pieoptions
    })



    let {data: bardata, option: baroption} = this.theData(barList, labels, this.props.saleData.title);
    console.log(bardata, baroption)
    let ctx = this.barChart.current.getContext("2d")
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: bardata,
      options: baroption
    })
  }

  theData(list, labels, title) {
    let data = {
      labels: labels,
      datasets: [{
        label: "# of sales",
        data: list,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }

    let option = {
      responsive: true,
      title: {
        display: true,
        text: title,
        fontSize: 32
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return {data, option};
  }

  render(){
    return <div className="container mx-auto">
      <div className="row p-5">
        <div className="col-md-6">
          <canvas ref={this.barChart} width="400" height="400"></canvas>
        </div>
        <div className="col-md-6">
          <canvas ref={this.pieChart} width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  }
}


class Charts extends React.Component{
  componentDidMount() {
    this.props.getInitialData()
    this.props.getMultiplierData()
  }

  render(){
    return <div className="mt-5">
      {!this.props.sales.data.length && <p className="text-danger">No data, please click the button above.</p>}
      {this.props.sales.data.length > 0 &&
      <div>
        {this.props.sales.data.map((sale, index) => {
          return <div key={"chart" + index}>
            <OurChart saleData={sale} showOriginal={this.props.sales.showOriginal} multiplier={this.props.sales.multiplier}/>
          </div>
        })}
      </div>
      }
    </div>
  }
}

export default connect((state) => ({sales: state.sales}), {getInitialData, getMultiplierData})(Charts)
