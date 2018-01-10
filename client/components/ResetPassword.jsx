import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { resetUserPassword,
  clearResetPasswordState
} from '../actions/user';
import PasswordForm from './PasswordForm.jsx';

/**
 * @class ResetPassword
 * @classdesc returns ResetPassword component
 */
class ResetPassword extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { error, successfullyResetPassword } = nextProps.passwordReset;
    if (Object.keys(successfullyResetPassword).length > 0) {
      toastr.success(successfullyResetPassword.message);
      browserHistory.push('/signin');
      this.setState({
        isLoading: false
      });
    }
    if (error) {
      toastr.error(error.message);
      this.setState({
        isLoading: false
      });
    }
  }
  /**
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearResetPasswordState();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.clearResetPasswordState();
    this.props.resetUserPassword(this.props.params.key, this.state);
    this.setState({
      isLoading: true
    });
  }
  /**
   * @return {XML} JSX
   */
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
          {this.state.isLoading ? <h5>Please wait...</h5> : '' }
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <PasswordForm
                onChange={this.onChange}
              />
              <button
                disabled={this.state.isLoading}
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
/**
 * @param {object} state
 * @return {object} prop
 */
const mapStateToProps = state => ({
  auth: state.auth,
  passwordReset: state.resetPassword
});
export default connect(mapStateToProps, {
  resetUserPassword,
  clearResetPasswordState
})(ResetPassword);

