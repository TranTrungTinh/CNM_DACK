import React, { Component } from 'react';
import './SignIn.css';
import axios from 'axios';
import swal from 'sweetalert2';

import {Redirect} from 'react-router-dom';
import {socket} from '../../socketClient';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {isLogin: false}
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn() {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('/api/login' , {username , password})
    .then(({ data }) => {
      if(data.error) return swal('FAIL', data.error , 'error');
      socket.emit('DRIVER_LOG_IN', data.driver.id);
      socket.on('LOGIN_SUCCESS', () => {
        this.props.logIn(data.driver);
        this.setState({isLogin: true});
      });
      socket.on('LOGIN_FAIL', () => {
        swal('FAIL',`Đã có tài xế đăng nhập dưới tên tài khoản: ${username}`,'error');
      });
    })
    .catch(error => swal('FAIL', error.message , 'error'));
  }
  render() {
    const redirect = this.state.isLogin ? <Redirect to="/home" /> : null;
    return (
      <div className="row" id="signin">
        {redirect}
        <h4>SIGN IN</h4>
        <div className="input-field">
          <i className="material-icons prefix">account_circle</i>
          <input type="text"  ref="username" />
          <label>Username</label>
        </div>
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input type="password" ref="password" />
          <label>Password</label>
        </div>
        <button className="btn btn_signin waves-effect waves-light red"
          onClick={this.handleSignIn}
        > sign in</button>
      </div>
    );
  }
}

export default connect(null , actionCreators)(SignIn);