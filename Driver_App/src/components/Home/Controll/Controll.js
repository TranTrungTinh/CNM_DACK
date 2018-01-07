import React, { Component } from 'react';
import './Controll.css';

export default class Controll extends Component {

  state = {
    isStart: true
  }

  handleStartClick = () => {
    this.setState({isStart: false});
    this.props.onMap();
  }

  handleEndClick = () => {
    this.setState({isStart: true});    
    this.props.offMap();
  }

  render() {
    const {isStart} = this.state;
    return (
      <div className="controll" >
        <button className="waves-effect waves-light btn green btn_start" 
          disabled={!isStart} 
          onClick={this.handleStartClick}
        >BẮT ĐẦU</button>
        <button className="waves-effect waves-light btn red btn_end" 
          disabled={isStart} 
          onClick={this.handleEndClick}        
        >KẾT THÚC</button>        
      </div>
    );
  }
}