import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

import { updateDay, saveData } from '../redux/DailyChart/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

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

class DailyChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: this.props.day,
            series: this.props.series,
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

    changeDayState = (event) => {
      this.setState({day: event.target.value});
    }

    loadChart = async() => {
      if (this.state.day == null || isNaN(this.state.day) || this.state.day < 1 || this.state.day > 600) {
        alert("1 ~ 600 사이의 숫자만 입력해주세요.");
      } else {
        let data = await axios.get('http://localhost:5000/stockdailycandle/' + this.props.stockcode + '/' + this.state.day)
                                  .then(function (response) {
                                      return response.data;
                                  })
                                  .catch(function (error) {
                                      console.log(error);
                                  });
        let stringData = JSON.stringify(data).replaceAll("일자", "x").replaceAll("시가\":", "y\":[")
        .replaceAll("\"현재가\":", "").replaceAll("\"고가\":", "").replaceAll("\"저가\":", "").replaceAll("}", "]}");
        let jsonData = JSON.parse(stringData);
        this.setState({series:[{data: jsonData}]});

        this.props.updateDay(this.state.day);
        this.props.saveData(this.state.series);
      }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} id="chart">
                <div id="day_input">
                  <TextField onChange={this.changeDayState} size="small" id="outlined-basic" label="거래일 입력" variant="outlined" defaultValue={this.props.day}/>
                  <Button onClick={this.loadChart} style={{marginLeft: "3px"}} variant="outlined" color="primary" size="large">입력</Button>
                </div>
                <Chart options={this.state.options} series={this.state.series} type="candlestick" width="96%" height={350} />
                <Button onClick={this.sendDailyChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

const mapStateToProps = ({dailyChart}) => {
  return {
    day: dailyChart.day,
    series: dailyChart.series
  }
}

const mapDispatchToProps = {
  updateDay: (day) => updateDay(day),
  saveData: (series) => saveData(series)
}

export default compose(withStyles(useStyles), connect(mapStateToProps, mapDispatchToProps))(DailyChart)