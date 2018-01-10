import React, { Component } from 'react';

export default class NotPickup extends Component {
  render() {
    const {address} = this.props;
    return (
      <li className="list-group-item list-group-item-warning">{address}</li>
    );
  }
}