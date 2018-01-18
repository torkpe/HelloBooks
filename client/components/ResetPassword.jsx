import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { resetUserPassword,
  clearResetPasswordState
} from '../actions/user';
import PasswordForm from './PasswordForm.jsx';

/**
 * @classdesc returns ResetPassword component
 */
class ResetPassword extends Component {
  /**
   * @description Created an instance of ResetPassword
   * 
   * @param {object} props
   * 
   * @returns {undefined}
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
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @returns {undefined}
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
   * @description React life cycle
   * 
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.clearResetPasswordState();
  }
  /**
   * @description Read input from form
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @description Handle form submit
   * 
   * @param {object} event
   * 
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
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  auth: state.auth,
  passwordReset: state.resetPassword
});
export default connect(mapStateToProps, {
  resetUserPassword,
  clearResetPasswordState
})(ResetPassword);

