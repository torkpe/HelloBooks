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
      browserHistory.push('/home');
    }
    if (nextProps.passwordChange.errors.message) {
      toastr.error(nextProps.passwordChange.errors.message);
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
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="password" onChange={this.onChange}
                  className="mdl-textfield__input" name="oldPassword" />
                <label htmlFor="password" className="mdl-textfield__label">
                  Old Password
                </label>
                <span className="error" />
              </div>
              <PasswordForm
                onChange={this.onChange}
              />
              <button
                disabled={this.props.setPassword.isLoading}
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

