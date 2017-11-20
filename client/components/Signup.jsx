import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { userSignup } from '../actions/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { successfullySignedup } = nextProps.signup;
    if (successfullySignedup.message.length > 0) {
      browserHistory.push('/redirect');
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignup(this.state);
  }
  render() {
    const { errors, isLoading } = this.props.signup;
    const span = <span />;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="email" onChange={this.onChange}
                  className="mdl-textfield__input" name="email" />
                <label htmlFor="email" className="mdl-textfield__label">Email</label>
                <span className="error">{ errors && errors.message }</span>
              </div>
              <button
                disabled={isLoading}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="button">
                Sign up
              </button>
            </form>
            <div className="mdl-card__supporting-text ask">
              Already have an account? Sign in below
            </div>
            <Link to="/signin">
              <button className="mdl-button mdl-js-button mdl-button--raised" id="button">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
Signup.propTypes = {
  userSignup: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  signup: state.userSignup,
});
export default connect(mapStateToProps,
  { userSignup })(Signup);
