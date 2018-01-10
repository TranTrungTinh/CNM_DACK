import React, { Component } from 'react';
import './App.css';

// componetns
import Header from './components/Header/Header';
import Contents from './components/Contents/Contents';
import History from './components/History/History';
import Title from './components/History/Title/Title';
class App extends Component {
  render() {
    return (
      <div className="wrap_container">
        <Header />
        <Contents />
        <Title />
        <History />
      </div>
    );
  }
}

export default App;
