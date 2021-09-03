import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Main from './components/Main';
import StockHome from './components/StockHome';

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path ='/' component={Main} />
            <Route path='/:stockcode' component={StockHome} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;