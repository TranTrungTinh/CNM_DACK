import React, { Component } from 'react';
import './App.css';

// components
import Header from './components/Header/Header';
import Title from './components/Content/Title/Title';
import Content from './components/Content/Content';
import GoogleMap from './components/GoogleMap/GoogleMap';

class App extends Component {
  render() {
    return (
      <div className="wrapper_container">
        <Header />
        <Title />
        <Content />
        <GoogleMap />
      </div>
    );
  }
}

export default App;
