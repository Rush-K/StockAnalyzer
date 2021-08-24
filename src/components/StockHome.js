import React, { Component } from 'react';
import { Container, Divider, Paper, Typography, Button,
        List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { ArrowDropUp, ArrowDropDown,ChangeHistory, TrendingUp, LibraryBooks, HowToReg } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import DailyChart from './DailyChart';
import TriangularConvergenceChart from './TriangularConvergenceChart';
import CreditTradingChart from './CreditTradingChart';
import axios from 'axios';

const useStyles = theme => ({
    root: {
      display: 'flex',
      height: '100vh',
      alignItems: "center",
      justifyContent: "center",
      '& > *': {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(80),
      },
    },
    indexPaper: {
        display:"flex",
        flexDirection: "column",
        margin: theme.spacing(1),
        width: theme.spacing(48),
        height: "20%",
        '& > div#index_title': {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            '& > div#title_text': {
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                '& > div#index_text': {
                    display: "flex",
                    justifyContent: "center",
                }
            }
        }
    },
    menuPaper: {
        display:"flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: theme.spacing(29),
        height: "80%",
        margin: theme.spacing(1),
        '& > div#list': {
            width: "100%",
        },
        '& > div#stockname': {
            display: "flex",
            justifyContent: "center",
            width: "100%",
        },
        '& > div#back': {
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
        }
      },
    homePaper: {
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing(67),
        height: "80%",
        margin: theme.spacing(1),
        '& > *': {
            width: "100%",
        }
    },
    button: {
      margin: theme.spacing(1),
    },
  });

class StockHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StockName: null,
            Index: null,
            DailyChart : false,
            TriangularConvergenceChart : false,
            CreditTradingChart : false, 
        }
    }

    changeDailyChartState = (event) => {
        this.setState({
            DailyChart: !this.state.DailyChart,
            TriangularConvergenceChart: false,
            CreditTradingChart: false,
        });
    }

    changeTriangularConvergenceChartState = (event) => {
        this.setState({
            DailyChart: false,
            TriangularConvergenceChart: !this.state.TriangularConvergenceChart,
            CreditTradingChart: false,
        });
    }

    changeCreditTradingChartState = (event) => {
        this.setState({
            DailyChart: false,
            TriangularConvergenceChart: false,
            CreditTradingChart: !this.state.CreditTradingChart
        });
    }
    
    componentDidMount = async() => {
        let stockname = await axios.get('http://localhost:5000/stockname/' + this.props.match.params.stockcode)
                                   .then(function (response) {
                                       return response.data;
                                   })
                                   .catch(function (error) {
                                       console.log(error);
                                   })

        let index = await axios.get('http://localhost:5000/index')
                               .then(function (response) {
                                    return response.data;
                               })
                               .catch(function (error) {
                                    console.log(error);
                               })

        this.setState({StockName: stockname, Index: index});
    }

    render() {
        const { classes } = this.props;
        return (
            this.state.stockname === null ?
            <div className={classes.root}>
                <CircularProgress />
            </div> :
            <Container className={classes.root}>
                <div>
                    {/* KOSPI COSDAQ 지수 */}
                    <Paper className={classes.indexPaper}>
                        <div id="index_title">
                            <div id="title_text">
                                <Typography variant="h7">KOSPI</Typography>
                            </div>
                            <Divider />
                            {this.state.Index === null ?
                            <div id="title_text">
                                <CircularProgress /> 
                            </div> :
                            <div id="title_text">
                                <div id="index_text">
                                    <Typography variant="h2">{this.state.Index[0].KOSPIprice}</Typography>
                                </div>
                                <div id ="index_text">
                                    {this.state.Index[0].KOSPIctpd.includes("+") ? 
                                    <ArrowDropUp color="secondary" /> :
                                    <ArrowDropDown color="primary" />}
                                    <Typography variant="h6">{this.state.Index[0].KOSPIctpd.replace("+", "").replace("-", "")}</Typography>
                                </div>
                            </div>}
                        </div>
                    </Paper>
                    <Paper className={classes.indexPaper}>
                        <div id="index_title">
                            <div id="title_text">
                                <Typography variant="h7">KOSDAQ</Typography>
                            </div>
                            <Divider />
                            {this.state.Index === null ?
                            <div id="title_text">
                                <CircularProgress /> 
                            </div> :
                            <div id="title_text">
                                <div id="index_text">
                                    <Typography variant="h2">{this.state.Index[0].KOSDAQprice}</Typography>
                                </div>
                                <div id ="index_text">
                                    {this.state.Index[0].KOSDAQctpd.includes("+") ? 
                                    <ArrowDropUp color="secondary" /> :
                                    <ArrowDropDown color="primary" />}
                                    <Typography variant="h6">{this.state.Index[0].KOSDAQctpd.replace("+", "").replace("-", "")}</Typography>
                                </div>
                            </div>}
                        </div>
                    </Paper>

                    {/* 메뉴 */}
                    <Paper elevation={3} className={classes.menuPaper}>
                        <div id="stockname">
                            <Typography variant="h6">{this.state.StockName}</Typography>
                        </div>
                        <Divider style={{width:"100%"}}/>
                        <div id="list">
                            <List>
                                <ListItem button onClick={this.changeDailyChartState}>
                                    <ListItemIcon>
                                        <TrendingUp />
                                    </ListItemIcon>
                                    <ListItemText primary="일자별 주가그래프" />
                                </ListItem>
                                <ListItem button onClick={this.changeTriangularConvergenceChartState}>
                                    <ListItemIcon>
                                        <ChangeHistory />
                                    </ListItemIcon>
                                    <ListItemText primary="삼각수렴 확인" />
                                </ListItem>
                                <ListItem button onClick={this.changeCreditTradingChartState}>
                                    <ListItemIcon>
                                        <LibraryBooks />
                                    </ListItemIcon>
                                    <ListItemText primary="신용 매매동향 확인" />
                                </ListItem>
                                <ListItem button divider>
                                    <ListItemIcon>
                                        <HowToReg />
                                    </ListItemIcon>
                                    <ListItemText primary="투자자 매매현황 확인" />
                                </ListItem>
                            </List>
                        </div>
                        <div id="back">
                            <Link to="/">
                                <Button>
                                    이전 페이지로
                                </Button>
                            </Link>
                        </div>
                    </Paper>

                    {/* 홈 */}
                    <Paper elevation={3} className={classes.homePaper}>
                        {this.state.DailyChart === true && <DailyChart changeDailyChartState={this.changeDailyChartState} stockcode={this.props.match.params.stockcode}/>}
                        {this.state.TriangularConvergenceChart === true && <TriangularConvergenceChart changeTriangularConvergenceChartState={this.changeTriangularConvergenceChartState} stockcode={this.props.match.params.stockcode} />}
                        {this.state.CreditTradingChart === true && <CreditTradingChart changeCreditTradingChartState={this.changeCreditTradingChartState} stockcode={this.props.match.params.stockcode} />}
                    </Paper>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(StockHome);