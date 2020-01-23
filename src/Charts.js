import React from "react";
import {connect} from "react-redux";
import {getInitialData} from "./actions";
import Chart from "chart.js"


class OurChart extends React.Component{
  constructor(props) {
    super(props);

    this.barChart = React.createRef()
    this.pieChart = React.createRef()
  }
  componentDidMount() {
    let data = {}
    data.labels = this.props.saleData.items.map(value => value.name)
    data.datasets = [{
      label: "# of sales",
      data: this.props.saleData.items.map(value => value.count),
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

    let options = {
        responsive: true,
        title: {
          display: true,
          text: this.props.saleData.title,
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

    let pie = this.pieChart.current.getContext("2d")
    this.pie = new Chart(pie, {
      type: 'pie',
      data,
      options
    })



    let ctx = this.barChart.current.getContext("2d")
    this.chart = new Chart(ctx, {
      type: 'bar',
      data,
      options
    })
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
  }

  render(){
    return <div className="mt-5">
      {!this.props.sales.data.length && <p className="text-danger">No data, please click the button above.</p>}
      {this.props.sales.data.length &&
      <div>
        {this.props.sales.data.map((sale, index) => {
          return <div key={"chart" + index}>
            <OurChart saleData={sale}/>
          </div>
        })}
      </div>
      }
    </div>
  }
}

export default connect((state) => ({sales: state.sales}), {getInitialData})(Charts)
