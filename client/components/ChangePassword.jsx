import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { setPassword,
  clearSetPasswordState
} from '../actions/changePassword';

class Password extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.passwordChange.response.message) {
      toastr.success(nextProps.passwordChange.response.message);
    }
    if (nextProps.passwordChange.errors.message) {
      toastr.error(nextProps.passwordChange.errors.message);
    }
  }
  componentWillUnmount() {
    this.props.clearSetPasswordState();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.clearSetPasswordState();
    this.props.setPassword(this.props.auth.user.id, this.state);
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
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="password" onChange={this.onChange}
                  className="mdl-textfield__input" name="password" />
                <label htmlFor="password" className="mdl-textfield__label">
                  New Password
                </label>
                <span className="error" />
              </div>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="password" onChange={this.onChange}
                  className="mdl-textfield__input" name="confirmPassword" />
                <label
                htmlFor="password"
                className="mdl-textfield__label">
                Confirm Password
                </label>
                <span className="error" />
              </div>
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
const mapStateToProps = state => ({
  auth: state.auth,
  passwordChange: state.changePassword
});
export default connect(mapStateToProps, {
  setPassword,
  clearSetPasswordState
})(Password);

