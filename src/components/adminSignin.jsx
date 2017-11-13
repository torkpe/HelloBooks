import React, { Component } from 'react';
import { Link } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSigninRequest } from '../actions/user';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signinType: 'admin',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.userSigninRequest(this.state);
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
                  type="email"
                  className="mdl-textfield__input"
                  onChange={this.onChange}
                  name="email"
                  id="email"
                />
                <label htmlFor="email" className="mdl-textfield__label">Email</label>
              </div>
              <div
              className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content">
                <input
                  type="password"
                  className="mdl-textfield__input"
                  onChange={this.onChange}
                  name="password"
                  id="password"
                />
                <label htmlFor="password" className="mdl-textfield__label">Password</label>
              </div>
              <button
              disabled={this.props.isLoading}
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              id="button">
                  Sign in
              </button>
            </form>
            <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
            id="button">
              Sign in with Google+
            </button>
            <div className="mdl-card__supporting-text ask">
              Don't Have an Account yet? Create one Below
            </div>
            <Link to="/signup">
              <button className="mdl-button mdl-js-button mdl-button--raised" id="button">
                        Create Account
              </button>
            </Link>
            <div className="mdl-card__supporting-text ask">
              <Link>forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  userSigninRequest: propTypes.func.isRequired,
};
// Copy signin state props for easy access
const mapStateToProps = state => ({
  adminSignin: state.signin,
});
export default connect(mapStateToProps, { userSigninRequest })(Signin);

