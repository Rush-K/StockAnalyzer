import React, { Component } from 'react';
import { Container, Divider, Paper, Typography,
        List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { GraphicEq } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      display: 'flex',
      height: '100vh',
      alignItems: "center",
      justifyContent: "center",
      '& > *': {
        display: "flex",
        justifyContent: "flex-start",
        margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(60),
      },
    },
    menuPaper: {
        display:"flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: theme.spacing(30),
        height: "100%",
        margin: theme.spacing(1),
        '& > *': {
            display: "flex",
            justifyContent: "center",
            width: "100%",
        }
      },
    homePaper: {
        display:"flex",
        justifyContent: "center",
        width: theme.spacing(70),
        height: "100%",
        margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(2),
      width: "100%",
    },
    button: {
      margin: theme.spacing(1),
    },
  });

class StockHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.root}>
                <div>
                    {/* 메뉴 */}
                    <Paper elevation={3} className={classes.menuPaper}>
                        <div>
                            <Typography variant="h6">{this.props.match.params.stockcode}</Typography>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <GraphicEq />
                                </ListItemIcon>
                                <ListItemText primary="일자별 주가그래프" />
                            </ListItem>
                        </List>
                    </Paper>

                    {/* 홈 */}
                    <Paper elevation={3} className={classes.homePaper}>

                    </Paper>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(StockHome);