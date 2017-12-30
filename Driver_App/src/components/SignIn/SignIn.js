import React, { Component } from 'react';
import './SignIn.css';

export default class SignIn extends Component {
  render() {
    return (
      <div className="row" id="signin">
        <h4>SIGN IN</h4>
        <div className="input-field">
          <i className="material-icons prefix">email</i>
          <input type="email" className="validate" ref="email" />
          <label>Email</label>
        </div>
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input type="password" className="validate" ref="password" />
          <label>Password</label>
        </div>

        <button className="btn btn_signin waves-effect waves-light red"
        > sign in
        </button>
      </div>
    );
  }
}