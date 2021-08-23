import React, { Component } from 'react';
import { Container, Divider, Paper, Typography, Button,
        List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ChangeHistory, TrendingUp, LibraryBooks, HowToReg } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import DailyChart from './DailyChart';
import TriangularConvergenceChart from './TriangularConvergenceChart';
import CreditTradingChart from './CreditTradingChart';

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
                justifyContent: "center",
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

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.root}>
                <div>
                    {/* KOSPI COSDAQ 지수 */}
                    <Paper className={classes.indexPaper}>
                        <div id="index_title">
                            <div id="title_text">
                                <Typography variant="h7">KOSPI</Typography>
                            </div>
                            <Divider />
                            <div id="title_text">
                                <Typography variant="h1">3000.0</Typography>
                            </div>
                        </div>
                    </Paper>
                    <Paper className={classes.indexPaper}>
                        <div id="index_title">
                            <div id="title_text">
                                <Typography variant="h7">KOSDAQ</Typography>
                            </div>
                            <Divider />
                            <div id="title_text">
                                <Typography variant="h1">1000.0</Typography>
                            </div>
                        </div>
                    </Paper>

                    {/* 메뉴 */}
                    <Paper elevation={3} className={classes.menuPaper}>
                        <div id="stockname">
                            <Typography variant="h6">{this.props.match.params.stockcode}</Typography>
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