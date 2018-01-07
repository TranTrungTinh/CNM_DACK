import React, { Component } from 'react';
import './App.css';
//redux
import {connect} from 'react-redux';
import * as actionCreators from './redux/action/actionCreators';
// components
import Header from './components/Header/Header';
import Title from './components/Content/Title/Title';
import Content from './components/Content/Content';
import GoogleMap from './components/GoogleMap/GoogleMap';

class App extends Component {
  render() {
    const {rider , driver} = this.props.currentData;
    return (
      <div className="wrapper_container">
        <Header />
        <Title />
        <Content />
        <GoogleMap rider={rider} driver={driver} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentData: state.selectedRiders.currentData
});
export default connect(mapStateToProps , actionCreators)(App);
