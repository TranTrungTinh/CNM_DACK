import React, { Component } from 'react';

// import library
import swal from 'sweetalert';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete'
import {geocodeByAddress , getLatLng} from 'react-places-autocomplete';
// import css
import './Contents.css';

export default class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      address: '',
      bike: false,
      other: null,
      lat: null,
      lng: null,
      state: false // chua duoc dinh vi
    };

    this.handlePhoneInput = this.handlePhoneInput.bind(this);
    this.handlePhoneBlur = this.handlePhoneBlur.bind(this);
    this.handleAddressBlur = this.handleAddressBlur.bind(this);
    this.handleAddressInput = this.handleAddressInput.bind(this);
    this.handleVehicle = this.handleVehicle.bind(this);
    this.handleOtherDetail = this.handleOtherDetail.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
  }

  handlePhoneInput(event) {
    this.setState({phone: event.target.value});
  }

  handlePhoneBlur() {
    const {phone} = this.state;
    if(!phone) return this.refs.phone.focus();
    if(isNaN(+phone)) return swal({
      title: "WARNING",
      text: "Chỉ nhập số !!!",
      icon: "warning"
    }).then(() => {
      this.refs.phone.value = '';
      this.refs.phone.focus();
    });
  }

  handleAddressInput(address) {
    this.setState({ address });
  }

  handleAddressBlur() {
    const {address} = this.state;
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({lat , lng}) => {
      const checkLat = 10.5 < lat && lat < 10.8 ? true : false;
      const checkLng = 106.5 < lng && lng < 106.8 ? true : false;
      if(checkLat && checkLng) this.setState({lat , lng});
    });
  }

  handleVehicle() {
    const bike = this.refs.bike.checked;
    this.setState({ bike });
  }

  handleOtherDetail() {
    this.setState({other: this.refs.otherDetails.value});
  }

  handleBooking() {
    const {lat , lng} = this.state;
    if(!lat && !lng) return swal("FAIL","Chỉ chấp nhận địa chỉ trong TPHCM","error");
    axios.post('/api/order' , this.state)
    .then(({ data }) => {
      if(data.error) return swal('FAIL', data.error , 'error');
      swal('SUCCESS' , 'Đặt xe thành công' , 'success');
    });
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleAddressInput,
      onBlur: this.handleAddressBlur,
      type: "text",
      placeholder: "Enter address"
    }
    
    return (
      <div id="order_container">
        <label htmlFor="InputPhone">Phone Number</label>
        <input className="form-control" type="text" ref="phone" placeholder="Enter phone number" maxLength="11"
          onChange={this.handlePhoneInput}
          onBlur={this.handlePhoneBlur}
        />
          <label htmlFor="InputAddress">Address Pickup</label>
          <PlacesAutocomplete inputProps={inputProps} classNames={{input: "form-control"}} />
            <label htmlFor="TexareaOther">Other details</label>
            <textarea className="form-control" rows="3" placeholder="Enter other details" ref="otherDetails"
              onChange={this.handleOtherDetail}
            ></textarea>
            <div className="cc-selector">
              <input id="bike" type="radio" name="vehicle" value="bike" ref="bike"
                onChange={this.handleVehicle}
              />
              <label className="drinkcard-cc bike" htmlFor="bike"></label>
              <input id="car" type="radio" name="vehicle" value="car" 
                onChange={this.handleVehicle}
              />
              <label className="drinkcard-cc car" htmlFor="car"></label>
            </div>
            <button type="button" className="btn btn-outline-danger btn-lg btn-block"
              onClick={this.handleBooking}
            >BOOKING A CAR
            </button>
      </div>
    );
  }
}