import React, { Component } from 'react';
import { Button, InputLabel, MenuItem, FormControl, Select,
  Container, Paper, Divider, Typography, CircularProgress } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearData } from '../redux/rootReducer';

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
      
      this.props.clearData();
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
                  <Typography variant="h6">????????? ?????? ?????? ????????? ???????????????!</Typography>
                </div>
                <Divider />

                {/* ?????? ?????? ???????????? */}
                <div style={{marginTop: "1vh"}}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="stock-list-label">????????? ????????? ???????????????.</InputLabel>
                      <Select
                        labelId="stock-list-label"
                        id="stock-list"
                        value={this.state.selectedStock}
                        onChange={this.selectStock}
                        label="stock-list-label"
                      >
                      <MenuItem value={null}>
                        <em>?????? ??????</em>
                      </MenuItem>
                      {this.state.stockList.map((stock) => {
                        return (<MenuItem value={stock.scode}>{stock.sname}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </div>

                {/* ?????? ?????? */}
                <div>
                  {this.state.selectedStock === null ?
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<Cancel/>}>
                      ????????????
                    </Button>
                  :
                    <Link to={`/${this.state.selectedStock}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Send/>}>
                        ????????????
                      </Button>
                    </Link>
                  }
                </div>
              </Paper>
            </Container>
          );
      }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  clearData: () => clearData()
}

export default compose(withStyles(useStyles), connect(mapStateToProps, mapDispatchToProps))(Main);