import React, { Component } from 'react';
// components
import GoogleMap from './components/GoogleMap';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header /> 
        <GoogleMap />
      </div>
    );
  }
}

export default App;
