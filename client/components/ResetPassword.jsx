import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { resetUserPassword,
  clearResetPasswordState
} from '../actions/user';
import PasswordForm from './PasswordForm.jsx';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { error, successfullyResetPassword } = nextProps.passwordReset;
    if (Object.keys(successfullyResetPassword).length > 0) {
      toastr.success(successfullyResetPassword.message);
      browserHistory.push('/signin');
    }
    if (error) {
      toastr.error(error.message);
    }
  }
  componentWillUnmount() {
    this.props.clearResetPasswordState();
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.clearResetPasswordState();
    this.props.resetUserPassword(this.props.params.key, this.state);
  }
  render() {
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
              <PasswordForm
                onChange={this.onChange}
              />
              <button
                className={mdlButtonStyle}
                id="button">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  passwordReset: state.resetPassword
});
export default connect(mapStateToProps, {
  resetUserPassword,
  clearResetPasswordState
})(ResetPassword);

