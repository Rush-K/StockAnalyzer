import React, { Component } from 'react';
import { Button, InputLabel, MenuItem, FormControl, Select,
  Container, Paper, Divider, Typography } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { Link } from 'react-router-dom';

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
        height: theme.spacing(40),
        '& > div': {
          display:"flex",
          justifyContent: "center",
          width: "100%",
          margin: theme.spacing(1),
        }
      },
    },
    formControl: {
      margin: theme.spacing(2),
      width: "100%",
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
        selectedStock: null
      }

    }

    selectStock = (event) => {
      this.setState({selectedStock: event.target.value});
    }

    render () {
        const { classes } = this.props;
        console.log(this.state);
        return (
            <Container fixed className={classes.root}>
                <Paper elevation={3}>
                  <div>
                    <Typography variant="h3">STOCK ANALYZER</Typography>
                  </div>
                  <Divider />

                  <div>
                    <Typography variant="h6">다양한 주식 분석 정보를 알려드려요!</Typography>
                  </div>
                  <Divider />

                  {/* 주식 선택 드롭박스 */}
                  <div>
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
                        <MenuItem value={'삼성전자'}>삼성전자</MenuItem>
                        <MenuItem value={'SK하이닉스'}>SK하이닉스</MenuItem>
                        <MenuItem value={'두산중공업'}>두산중공업</MenuItem>
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