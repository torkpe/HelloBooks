import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';
import { userSignin, clearSigninState } from '../actions/user';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { myToken } = nextProps.signin.successfullySignedin;
    if (myToken && myToken !== undefined) {
      // Get token from response and decode it
      localStorage.setItem('jwt', myToken);
      browserHistory.push('/home');
    }
    if (nextProps.signin.errors.message) {
      toastr.error(nextProps.signin.errors.message);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.clearSigninState()
    this.props.userSignin(this.state);
  }
  render() {
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="email" className="mdl-textfield__input" onChange={this.onChange}
                  name="email" id="email" />
                <label htmlFor="email" className="mdl-textfield__label">Email</label>
              </div>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="password" className="mdl-textfield__input" onChange={this.onChange}
                  name="password" id="password" />
                <label htmlFor="password" className="mdl-textfield__label">Password</label>
              </div>
              <button
                disabled={this.props.signin.isLoading}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="button">
                    Sign in
              </button>
            </form>
            <div className="mdl-card__supporting-text ask">
                Don't Have an Account yet? Create one Below
            </div>
            <Link to="/signup">
              <button className="mdl-button mdl-js-button mdl-button--raised" id="button">
                Create Account
              </button>
            </Link>
            <div className="mdl-card__supporting-text ask">
              <a href="">forgot password?</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

Signin.propTypes = {
  userSignin: propTypes.func.isRequired,
};
// Copy signin state props for easy access
const mapStateToProps = state => ({
  signin: state.userSignin,
});
export default connect(mapStateToProps, { userSignin, clearSigninState })(Signin);
