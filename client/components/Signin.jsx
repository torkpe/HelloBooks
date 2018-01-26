import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import EmailForm from './EmailForm.jsx';
import { connect } from 'react-redux';
import { userSignin, clearSigninState } from '../actions/user';

/**
 * @classdesc Returns Signin component
 */
export class Signin extends Component {
  /**
   * @description Created an instance of Settings
   * 
   * @param {object} props
   * 
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { myToken } = nextProps.signin.successfullySignedin;
    if (myToken && myToken !== undefined) {
      // Get token from response and decode it
      localStorage.setItem('jwt', myToken);
      browserHistory.push('/home');
    }
    if (nextProps.signin.errors.message) {
      toastr.error(nextProps.signin.errors.message);
      this.props.clearSigninState();
    }
  }
  /**
   * @description Read input from form
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description Handle submit event
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.clearSigninState();
    this.props.userSignin(this.state);
  }
  /**
   * @description Renders Signin component
   * 
   * @return {XML} JSX
   */
  render() {
    const mdlButtonStyle = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored`;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge form-card mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <h5> Sign in</h5>
              <EmailForm
                onChange={this.onChange}
              />
              <div
              className="card-content card-wrapper input-wrapper">
                <input
                type="password"
                onChange={this.onChange}
                name="password" id="password"
                placeholder="Password"
                />
              </div>
              <button
                disabled={this.props.signin.isLoading}
                className={mdlButtonStyle}
                name="signin"
                id="button">
                    Sign in
              </button>
            </form>
            <div className="mdl-card__supporting-text">
                Don't Have an Account yet? Create one Below
            </div>
            <Link to="/signup">
              <button
              className="mdl-button mdl-js-button mdl-button--raised"
              id="button">
                Create Account
              </button>
            </Link>
            <div
            className="mdl-card__supporting-text">
              <Link to="/forgot-password">forgot password?</Link>
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

/**
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  signin: state.userSignin,
});
export default connect(mapStateToProps, { userSignin, clearSigninState })(Signin);
