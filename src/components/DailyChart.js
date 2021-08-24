import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Chart from 'react-apexcharts';
import axios from 'axios';


class DailyChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: []
            }],
            options: {
                chart: {
                  type: 'candlestick',
                  height: 350
                },
                title: {
                  text: this.props.stockname,
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

    componentDidMount = async() => {
      let data = await axios.get('http://localhost:5000/stockdailycandle/' + this.props.stockcode)
                            .then(function (response) {
                              return response.data;
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
      let stringData = JSON.stringify(data).replaceAll("일자", "x").replaceAll("시가\":", "y\":[")
                       .replaceAll("\"현재가\":", "").replaceAll("\"고가\":", "").replaceAll("\"저가\":", "").replaceAll("}", "]}");
      let jsonData = JSON.parse(stringData);
      this.setState({series:[{data: jsonData}]});

    }

    render() {
        console.log(this.state);
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="candlestick" width="96%" height={350} />
                <Button onClick={this.sendDailyChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

export default DailyChart