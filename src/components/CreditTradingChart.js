import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { withStyles } from '@material-ui/styles';

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
        }
    }
});

class CreditTradingChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lenderOrLoan: false,
            lenderOptions: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            lenderSeries: [{
                name: "대주잔고",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }],
            loanOptions: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            loanSeries: [{
                name: "융자잔고",
                data: [30, 40, 45, 50, 49, 60, 70, 100]
            }],
        }
    }

    sendCreditTradingChartState = (event) => {
        this.props.changeCreditTradingChartState();
    }

    changeLenderOrLoanChartState = (event) => {
        this.setState({lenderOrLoan: !this.state.lenderOrLoan});
    }

    render() {
        const { classes } = this.props;

        return (
            <div id="chart" className={classes.root}>
                <div id="changeButton">
                    {this.state.lenderOrLoan === false ?
                    <Button variant="contained" color="primary" onClick={this.changeLenderOrLoanChartState} style={{margin: "10px"}}>대주 잔고</Button> :
                    <Button variant="contained" color="primary" onClick={this.changeLenderOrLoanChartState} style={{margin: "10px"}}>융자 잔고</Button>}
                </div>
                {this.state.lenderOrLoan === false ?
                <Chart options={this.state.lenderOptions} series={this.state.lenderSeries} width={500} height={350} /> :
                <Chart options={this.state.loanOptions} series={this.state.loanSeries} width={500} height={350} />}
                <Button onClick={this.sendCreditTradingChartState} variant="outlined" color="secondary" style={{margin: "10px", width: "96%"}}>차트 닫기</Button>
            </div>
        );
    }
}

export default withStyles(useStyles)(CreditTradingChart);