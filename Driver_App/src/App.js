import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
// components
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
