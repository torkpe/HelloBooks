import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { userSignup, clearSignupState } from '../actions/user';
import EmailForm from './EmailForm.jsx';

/**
 * @classdesc Returns Signin component
 */
export class Signup extends Component {
  /**
   * @description Created an instance of Settings
   * 
   * @param {object} props
   * 
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
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
    const { successfullySignedup } = nextProps;
    if (successfullySignedup && successfullySignedup.length > 0) {
      browserHistory.push('/redirect');
    }
    if (nextProps.signup.errors.message) {
      toastr.error(nextProps.signup.errors.message);
    }
  }
  /**
   * @description Read form input
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description Handle form submission
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.clearSignupState();
    this.props.userSignup(this.state);
  }
  /**
   * @description Render Signup component
   * 
   * @return {XML} JSX
   */
  render() {
    const { isLoading } = this.props.signup;
    const mdlButtonStyle = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored
    `;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge form-card mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <h5>Signup</h5>
              <EmailForm
                onChange={this.onChange}
              />
              <button
                disabled={isLoading}
                name="signup"
                className={mdlButtonStyle}
                id="button1">
                Sign up
              </button>
            </form>
            <div className="mdl-card__supporting-text">
              Already have an account? Sign in below
            </div>
            <Link to="/signin">
              <button
              name="signin"
              className="mdl-button mdl-js-button mdl-button--raised"
              id="button">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
Signup.propTypes = {
  userSignup: propTypes.func.isRequired,
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
  signup: state.userSignup,
  successfullySignedup: state.userSignup.successfullySignedup.message
});
export default connect(
  mapStateToProps,
  { userSignup, clearSignupState }
)(Signup);
