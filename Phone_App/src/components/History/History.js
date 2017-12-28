import React, { Component } from 'react';
// import css
import './History.css';
import review_png from '../../images/review.png';

export default class History extends Component {
  render() {
    return (
      <div id="history_container">
        <div id="history_title">
          <img src={review_png} alt="This is history of number phone" />
          <p>Review history ordered car</p>
        </div>
        <ul className="list-group"></ul>
      </div>
    );
  }
}