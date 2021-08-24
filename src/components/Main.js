import React, { Component } from 'react';
import { Button, InputLabel, MenuItem, FormControl, Select,
  Container, Paper, Divider, Typography, CircularProgress } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = theme => ({
    root: {
      display: 'flex',
      height: '100vh',
      alignItems: "center",
      justifyContent: "center",
      '& > *': {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection:"column",
        margin: theme.spacing(1),
        width: theme.spacing(80),
        height: theme.spacing(30),
        '& > div': {
          display:"flex",
          justifyContent: "center",
          width: "100%",
        },
        '& > div#text': {
          margin: theme.spacing(1),
        }
      },
    },
    formControl: {
      width: theme.spacing(78),
    },
    button: {
      margin: theme.spacing(1),
    },
  });

class Main extends Component {
    constructor(props) {
      super(props);

      this.state = {
        stockList: [],
        stockListLoading: false,
        selectedStock: null
      }

    }
    
    componentDidMount = async () => {
      let stocklist = await axios.get("http://localhost:5000/availablestocklist")
                            .then(function (response) {
                              console.log(response);// response
                              return response.data;
                            })
                            .catch(function (error) {
                              console.log(error);// error catch
                            });
      if (stocklist != null) {
        this.setState({stockList: stocklist, stockListLoading: true});
      }
    }

    selectStock = (event) => {
      this.setState({selectedStock: event.target.value});
    }

    render () {
        const { classes } = this.props;
        console.log(this.state);
        return (
          this.state.stockListLoading === false ?
            <div className={classes.root}>
              <CircularProgress />
            </div> :
            <Container fixed className={classes.root}>
              <Paper elevation={3}>
                <div>
                  <Typography variant="h3">STOCK ANALYZER</Typography>
                </div>
                <Divider />

                <div id="text">
                  <Typography variant="h6">다양한 주식 분석 정보를 알려드려요!</Typography>
                </div>
                <Divider />

                {/* 주식 선택 드롭박스 */}
                <div style={{marginTop: "1vh"}}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="stock-list-label">열람할 주식을 선택하세요.</InputLabel>
                      <Select
                        labelId="stock-list-label"
                        id="stock-list"
                        value={this.state.selectedStock}
                        onChange={this.selectStock}
                        label="stock-list-label"
                      >
                      <MenuItem value={null}>
                        <em>주식 선택</em>
                      </MenuItem>
                      {this.state.stockList.map((stock) => {
                        return (<MenuItem value={stock.scode}>{stock.sname}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </div>

                {/* 열람 버튼 */}
                <div>
                  {this.state.selectedStock === null ?
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<Cancel/>}>
                      열람불가
                    </Button>
                  :
                    <Link to={`/${this.state.selectedStock}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Send/>}>
                        열람하기
                      </Button>
                    </Link>
                  }
                </div>
              </Paper>
            </Container>
          );
      }
}

export default withStyles(useStyles)(Main);