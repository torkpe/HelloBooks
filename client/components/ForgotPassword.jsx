import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { userSignup, clearSignupState } from '../actions/user';
import EmailForm from './EmailForm.jsx';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { successfullySignedup } = nextProps;
    if (successfullySignedup && successfullySignedup.length > 0) {
      browserHistory.push('/redirect');
    }
    if (nextProps.signup.errors.message) {
      toastr.error(nextProps.signup.errors.message);
    }
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.clearSignupState();
    this.props.userSignup(this.state);
  }
  render() {
    const { isLoading } = this.props.signup;
    const span = <span />;
    const mdlButtonStyle = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored
    `;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <EmailForm
                onChange={this.onChange}
              />
              <button
                disabled={isLoading}
                className={mdlButtonStyle}
                id="button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  userSignup: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  signup: state.userSignup,
  successfullySignedup: state.userSignup.successfullySignedup.message
});
export default connect(
  mapStateToProps,
  { userSignup, clearSignupState }
)(ForgotPassword);
