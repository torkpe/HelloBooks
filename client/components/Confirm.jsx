import React, { Component } from 'react';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import PasswordForm from './PasswordForm.jsx';
import { userConfirmationRequest, clearUserConfirmationState } from '../actions/user';

/**
 * @class Confirm
 * @classdesc returns render component
 */
export class Confirm extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      key: this.props.params.key,
      confirmed: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @param {object} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { errors, confirmationSuccessful } = nextProps.confirmationRequest;
    if (Object.keys(nextProps.authenticated.user).length > 0) {
      browserHistory.push('/home');
    }
    if (Object.keys(errors).length > 0) {
      toastr.error(errors.message);
    }
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.clearUserConfirmationState();
    this.props.userConfirmationRequest(this.state);
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearUserConfirmationState();
  }
  /**
   * renders confirm component
   * @return {XML} JSX
   */
  render() {
    const mdlSigninButton = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored
    `;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge card-wrapper mdl-card mdl-shadow--3dp">
            <form action="">
              <h5>Complete Registration</h5>
              <div
                className="card-content card-wrapper input-wrapper">
                <input
                type="text"
                onChange={this.onChange}
                name="name" id="name"
                placeholder="Full Name"
                />
              </div>
              <PasswordForm
                onChange={this.onChange}
              />
              <button
                disabled={this.state.isLoading}
                onClick={this.onSubmit}
                className={mdlSigninButton}
                id="button">
                  Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Confirm.propTypes = {
  userConfirmationRequest: propTypes.func.isRequired,
  clearUserConfirmationState: propTypes.func.isRequired,
};
/**
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  confirmationRequest: state.userConfirmationRequest,
  authenticated: state.auth
});
export default connect(mapStateToProps, {
  userConfirmationRequest,
  clearUserConfirmationState
})(Confirm);
