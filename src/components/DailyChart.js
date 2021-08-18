import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Chart from 'react-apexcharts';


class DailyChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: [{
                    x: new Date(1538883000000),
                    y: [6603.85, 6605, 6600, 6604.07]
                  },
                  {
                    x: new Date(1538884800000),
                    y: [6604.98, 6606, 6604.07, 6606]
                }]
            }],
            options: {
                chart: {
                  type: 'candlestick',
                  height: 350
                },
                title: {
                  text: this.props.stockcode,
                  align: 'left'
                },
                xaxis: {
                  type: 'datetime'
                },
                yaxis: {
                  tooltip: {
                    enabled: true
                  }
                }
            }
        }
    }

    sendDailyChartState = (event) => {
        this.props.changeDailyChartState();
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
                <Button onClick={this.sendDailyChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

export default DailyChart