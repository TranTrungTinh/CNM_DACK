import React, { Component } from 'react';
import './App.css';

// components
import Header from './components/Header/Header';
import Title from './components/Content/Title/Title';
import Content from './components/Content/Content';

class App extends Component {
  render() {
    return (
      <div className="wrapper_container container">
        <Header />
        <Title />
        <Content />
      </div>
    );
  }
}

export default App;
