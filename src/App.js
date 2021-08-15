import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import Main from './components/Main';
import StockHome from './components/StockHome';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path ='/' component={Main} />
          <Route path='/:stockcode' component={StockHome} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;