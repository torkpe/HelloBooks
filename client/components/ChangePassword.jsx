import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { setPassword,
  clearSetPasswordState
} from '../actions/changePassword';
import PasswordForm from './PasswordForm.jsx';

/**
 * @class ChangePassword
 * @classdesc returns ChangePassword component
 */
class ChangePassword extends Component {
  /**
   * @param {object} props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @param {object} nextProps
   * @return {undefied} undefined
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.passwordChange.response.message) {
      toastr.success(nextProps.passwordChange.response.message);
      this.setState({
        isLoading: false
      });
      browserHistory.push('/home');
    }
    if (nextProps.passwordChange.errors.message) {
      toastr.error(nextProps.passwordChange.errors.message);
      this.setState({
        isLoading: false
      });
    }
  }
  /**
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearSetPasswordState();
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
    this.setState({
      isLoading: true
    });
    this.props.clearSetPasswordState();
    this.props.setPassword(this.props.auth.user.id, this.state);
  }
  /**
   * renders change password
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
          <div className="card-enlarge card-wrapper mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <h5>Change Password</h5>
              <div
                className="card-content card-wrapper input-wrapper">
                <input
                type="password"
                onChange={this.onChange}
                name="oldPassword" id="password5"
                placeholder="Old Password"
              />
              </div>
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
 * @return {object} props
 */
const mapStateToProps = state => ({
  auth: state.auth,
  passwordChange: state.changePassword
});
export default connect(mapStateToProps, {
  setPassword,
  clearSetPasswordState
})(ChangePassword);

