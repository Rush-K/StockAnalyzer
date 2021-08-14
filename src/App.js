import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Main from './components/Main';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path ='/' component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;