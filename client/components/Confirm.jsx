import React, { Component } from 'react';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { userConfirmationRequest, clearUserConfirmationState } from '../actions/user';

class Confirm extends Component {
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
  componentWillReceiveProps(nextProps) {
    const { errors, confirmationSuccessful } = nextProps.confirmationRequest;
    if (Object.keys(nextProps.authenticated.user).length > 0) {
      browserHistory.push('/home');
    }
    if (Object.keys(errors).length > 0) {
      toastr.error(errors.message);
    }
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.clearUserConfirmationState();
    this.props.userConfirmationRequest(this.state);
  }
  conmponentWillUnmount() {
    this.props.clearUserConfirmState();
  }
  render() {
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form action="">
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="text" className="mdl-textfield__input"
                  onChange={this.onChange}
                  name="name" id="name" />
                <label htmlFor="name" className="mdl-textfield__label">Full Name</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="password" className="mdl-textfield__input"
                  onChange={this.onChange} name="password" id="password1" />
                <label htmlFor="password1" className="mdl-textfield__label">Password</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="password" className="mdl-textfield__input"
                  onChange={this.onChange} name="confirmPassword" id="password2" />
                <label
                htmlFor="password2"
                className="mdl-textfield__label">Confirm Password
                </label>
              </div>
              <button
                onClick={this.onSubmit}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
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
};
const mapStateToProps = state => ({
  confirmationRequest: state.userConfirmationRequest,
  authenticated: state.auth
});
export default connect(mapStateToProps, {
  userConfirmationRequest,
  clearUserConfirmationState
})(Confirm);
