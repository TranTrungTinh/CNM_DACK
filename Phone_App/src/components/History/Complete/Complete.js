import React, { Component } from 'react';

export default class Complete extends Component {
  render() {
    const {address} = this.props;
    return (
      <li className="list-group-item list-group-item-success">{address}</li>
    );
  }
}