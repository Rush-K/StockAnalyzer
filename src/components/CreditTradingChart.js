import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';


const useStyles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        '& > div#changeButton': {
            display: "flex",
            width: "100%",
            justifyContent: "center",
        },
        '& > div#day_input': {
            margin: theme.spacing(3),
        }
    }
});

class CreditTradingChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: null,
            lenderOrLoan: false,
            lenderOptions: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                    type: 'datetime'
                },
            },
            lenderSeries: [{
                data: []
            }],
            loanOptions: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                    type: 'datetime'
                },
            },
            loanSeries: [{
                data: []
            }],
        }
    }

    sendCreditTradingChartState = (event) => {
        this.props.changeCreditTradingChartState();
    }

    changeLenderOrLoanChartState = (event) => {
        this.setState({lenderOrLoan: !this.state.lenderOrLoan});
    }

    changeDayState = (event) => {
        this.setState({day: event.target.value});
    }

    loadChart = async() => {
        if (this.state.day == null || isNaN(this.state.day) || this.state.day < 1 || this.state.day > 600) {
            alert("1 ~ 600 사이의 숫자만 입력해주세요.");
        } else {
            let type_zero_data = await axios.get('http://localhost:5000/credittrading/0/' + this.props.stockcode + '/' + this.state.day)
                                    .then(function (response) {
                                        return response.data;
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    }); // 융자잔고 데이터

            let type_one_data = await axios.get('http://localhost:5000/credittrading/1/' + this.props.stockcode + '/' + this.state.day)
                                    .then(function (response) {
                                        return response.data;
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    }); // 대주잔고 데이터

            type_zero_data = JSON.stringify(type_zero_data).replaceAll("일자", "x").replaceAll("융자잔고", "y");
            type_one_data = JSON.stringify(type_one_data).replaceAll("일자", "x").replaceAll("대주잔고", "y");
            

            let json_type_zero_data = JSON.parse(type_zero_data);
            let json_type_one_data = JSON.parse(type_one_data);


            this.setState({
                loanSeries: [{
                    data: json_type_zero_data
                }]
            });

            this.setState({
                lenderSeries: [{ 
                    data: json_type_one_data
                }],
            });
        }
      }

    render() {
        const { classes } = this.props;

        return (
            <div id="chart" className={classes.root}>
                <div id="day_input">
                    <TextField onChange={this.changeDayState} size="small" id="outlined-basic" label="거래일 입력" variant="outlined" />
                    <Button onClick={this.loadChart} style={{marginLeft: "3px"}} variant="outlined" color="primary" size="large">입력</Button>
                </div>
                <div id="changeButton">
                    {this.state.lenderOrLoan === false ?
                    <Button variant="contained" color="primary" onClick={this.changeLenderOrLoanChartState} style={{margin: "10px"}}>대주 잔고</Button> :
                    <Button variant="contained" color="primary" onClick={this.changeLenderOrLoanChartState} style={{margin: "10px"}}>융자 잔고</Button>}
                </div>
                {this.state.lenderOrLoan === false ?
                <Chart options={this.state.lenderOptions} series={this.state.lenderSeries} width={500} height={290} /> :
                <Chart options={this.state.loanOptions} series={this.state.loanSeries} width={500} height={290} />}
                <Button onClick={this.sendCreditTradingChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

export default withStyles(useStyles)(CreditTradingChart);