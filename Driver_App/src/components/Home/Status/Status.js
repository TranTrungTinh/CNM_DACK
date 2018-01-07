import React, { Component } from 'react';
import './Status.css';
import wifi from '../../../images/wifi.png';
import battery from '../../../images/battery.png';

export default class Status extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hour: '13',
      minute: '30'
    }
    this.checkTime = this.checkTime.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  checkTime(time) {
    if(time < 10) return `0${time}`;
    return time;
  }

  getTime() {
    const today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    hour = this.checkTime(hour);
    minute = this.checkTime(minute);
    return {hour , minute};
  }

  componentDidMount() {
    const {hour , minute} = this.getTime();
    this.setState({hour , minute});    
  }

  render() {
    const {hour , minute} = this.state;
    const haft = +hour < 12 ? 'AM' : 'PM';
    return (
      <div className="status" >
        <img src={wifi} alt="" />
        <div>{hour}:{minute} {haft}</div>
        <img src={battery} alt="" />          
      </div>     
    );
  }
}