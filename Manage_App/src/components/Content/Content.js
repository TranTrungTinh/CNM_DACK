import React, { Component } from 'react';
import './Content.css';

// components
import Waiting from './Profile/Waiting';
import PickUp from './Profile/PickUp';

export default class Content extends Component {
  render() {
    return (
      <div className="row list-state"> 
        <div className="waiting_container col" >
          <div class="list-group" id="watting_contend">
            <Waiting />
          </div>
        </div>

        <div className="selected_container col" >
          <div class="list-group" id="watting_selected">
            <PickUp />
          </div>
        </div>
      </div>
    );
  }
}