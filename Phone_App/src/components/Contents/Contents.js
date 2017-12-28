import React, { Component } from 'react';
// import css
import './Contents.css';

export default class Contents extends Component {

  handlePhoneInput = () => {
    
  }

  render() {
    return (
      <div id="order_container">
        <label htmlFor="InputPhone">Phone Number</label>
        <input className="form-control" type="text" id="phone" placeholder="Enter phone number" maxLength="11"
          onChange={this.handlePhoneInput}
        />
          <label htmlFor="InputAddress">Address Pickup</label>
          <input className="form-control " type="text" id="address" placeholder="Enter address"/>
            <label htmlFor="TexareaOther">Other details</label>
            <textarea className="form-control" rows="3" placeholder="Enter other details" id="otherDetails"></textarea>
            <div className="cc-selector">
              <input id="bike" type="radio" name="vehicle" value="bike" checked="checked" />
              <label className="drinkcard-cc bike" htmlFor="bike"></label>
              <input id="car" type="radio" name="vehicle" value="car" />
              <label className="drinkcard-cc car" htmlFor="car"></label>
            </div>
            <button type="button" className="btn btn-outline-danger btn-lg btn-block" id="btn_order">BOOKING A CAR</button>
      </div>
    );
  }
}