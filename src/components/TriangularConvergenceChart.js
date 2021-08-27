import React, { Component } from 'react';
import { Button, Divider, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Chart from 'react-apexcharts';
import axios from 'axios';

const useStyles = theme => ({
  root: {
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    margin: theme.spacing(1),
    '& > div#day_input': {
      margin: theme.spacing(3),
    }
  }
});

class TriangularConvergenceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: null,
            seriesMixedChart: [],
            optionsMixedChart: {
                title: {
                  text: this.props.stockname,
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

    changeDayState = (event) => {
      this.setState({day: event.target.value});
    }
    
    loadChart = async() => {
      if (this.state.day == null || isNaN(this.state.day) || this.state.day < 1 || this.state.day > 600) {
        alert("1 ~ 600 사이의 숫자만 입력해주세요.");
      } else {
        let gradient = await axios.get('http://localhost:5000/stockdailycandle/triangularconvergence/' + this.props.stockcode + '/' + this.state.day)
                                  .then(function (response) {
                                      return response.data;
                                  })
                                  .catch(function (error) {
                                      console.log(error);
                                  });
        let data = JSON.stringify(gradient).replace("\"topprice\":", "").replace("\"lowprice\":", "").replace("{", "").replace("}", "");
        let topdata = data.split("],")[0].replace("[", "").replace("]", "").replaceAll("\"", "");
        let lowdata = data.split("],")[1].replace("[", "").replace("]", "").replaceAll("\"", "");

        this.setState({seriesMixedChart: [
            {
              name: "최고가 추세", 
              type: "line", 
              data: [topdata.split(",")[0], topdata.split(",")[1]]
            },
            {
              name: "최저가 추세",
              type: "line",
              data: [lowdata.split(",")[0], lowdata.split(",")[1]]
            }
          ]
        })
      }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className = {classes.root} id="chart">
              <div id="day_input">
                <TextField onChange={this.changeDayState} size="small" id="outlined-basic" label="거래일 입력" variant="outlined" />
                <Button onClick={this.loadChart} style={{marginLeft: "3px"}} variant="outlined" color="primary" size="large">입력</Button>
              </div>
                <Chart options={this.state.optionsMixedChart} series={this.state.seriesMixedChart} height={350} />
                <Button onClick={this.sendTriangularConvergenceChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

export default withStyles(useStyles)(TriangularConvergenceChart)