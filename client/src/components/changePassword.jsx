import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPassword } from '../actions/changePassword';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password1: '',
      password2: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.setPassword(this.props.auth.user.user, this.state);
  }
  render() {
    return (
      <div className="mdl-grid">                                               
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">        
            <form onSubmit={this.onSubmit}>
              <div
              className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content">
                <input
                type="password" onChange={this.onChange}
                className="mdl-textfield__input" name="password" />
                <label htmlFor="password" className="mdl-textfield__label">Old Password</label>
                <span className="error" />
              </div>
              <div
              className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content">
                <input
                type="password" onChange={this.onChange}
                className="mdl-textfield__input" name="password1" />
                <label htmlFor="password" className="mdl-textfield__label">New Password</label>
                <span className="error" />
              </div>
              <div
              className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content">
                <input
                type="password" onChange={this.onChange}
                className="mdl-textfield__input" name="password2" />
                <label htmlFor="password" className="mdl-textfield__label">Confirm Password</label>
                <span className="error" />
              </div>
              <button
                disabled={this.props.setPassword.isLoading}
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
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
});
export default connect(null, { setPassword })(Password);

