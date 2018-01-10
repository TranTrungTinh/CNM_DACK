import React, { Component } from 'react';
// import css
import './History.css';
//components
import Complete from './Complete/Complete';
import NotPickUp from './NotPickup/NotPickup';
//redux
import { connect } from 'react-redux';

class History extends Component {
  constructor(props) {
    super(props);
    this.showComplete = this.showComplete.bind(this);
    this.showNotPickUp = this.showNotPickUp.bind(this);
  }

  showComplete(data , index) {
    const { address } = data;
    return (
      <Complete 
        key={index}
        address={address}
      />
    );
  }

  showNotPickUp(data , index) {
    const { address } = data;
    return (
      <NotPickUp 
        key={index}
        address={address}
      />
    );
  }

  render() {
    const { completes , notpickup } = this.props;
    return (
      <div className="row list-state">
        <div className="waiting_container col" >
          <div className="list-group">
            { completes.map(this.showComplete) }
          </div>
        </div>
        <div className="waiting_container col" >
          <div className="list-group">
          { notpickup.map(this.showNotPickUp) }            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  completes: state.completes,
  notpickup: state.notpickup
});
export default connect(mapStateToProps)(History);