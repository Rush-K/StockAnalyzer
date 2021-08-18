import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Chart from 'react-apexcharts';

class TriangularConvergenceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seriesMixedChart: [{
                name: '고가 추세',
                type: 'line',
                data: [30, 40]
                },
            {
                name: '저가 추세',
                type: 'line',
                data: [40, 30]
            }],
            optionsMixedChart: {
                chart: {
                  type: 'line',
                  toolbar: {
                      show: false
                  },
                  height: 350
                },
                title: {
                  text: this.props.stockcode,
                  align: 'center'
                },
                xaxis: {
                  categories: ["D - 1", "D - 0"]
                },
                yaxis: {
                  labels: {
                    show: false
                  },
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }
            }
        }
    }

    sendTriangularConvergenceChartState = (event) => {
        this.props.changeTriangularConvergenceChartState();
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} height={350} />
                <Button onClick={this.sendTriangularConvergenceChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

export default TriangularConvergenceChart