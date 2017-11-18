import React, { Component } from 'react';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { userConfirmRequest } from '../actions/user';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password1: '',
      password2: '',
      isLoading: false,
      key: this.props.params.key,
      confirmed: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    this.setState({ errors: {}, isLoading: true });
    e.preventDefault();
    this.props.userConfirmRequest(this.state).then(
      () => {
        browserHistory.push('/home');
      },
      (response) => this.setState({
          errors: response.data,
          isLoading: false
        }),
    )
  }
  render() {
    return (
      <div className="mdl-grid">
        <div className="contents">
            <div className="card-enlarge mdl-card mdl-shadow--3dp">
                    <form action="">
                        <div className="mdl-textfield mdl-js-textfield card-content">
                            <input
                                type="text" className="mdl-textfield__input"
                                onChange={this.onChange}
                                name="name" id="name" />
                            <label htmlFor="name" className="mdl-textfield__label">Full Name</label>
                          </div>
                        <div className="mdl-textfield mdl-js-textfield card-content">
                            <input
                                type="password" className="mdl-textfield__input"
                                onChange={this.onChange} name="password1" id="password1" />
                            <label htmlFor="password1" className="mdl-textfield__label">Password</label>                           
                          </div>
                        <div className="mdl-textfield mdl-js-textfield card-content">
                            <input
                                type="password" className="mdl-textfield__input"
                                onChange={this.onChange} name="password2" id="password2" />
                            <label htmlFor="password2"
                            className="mdl-textfield__label">Confirm Password</label>                           
                          </div>
                        <button
                          disabled={this.state.isLoading}
                          onClick={this.onSubmit}
                          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                          id="button">
                            Sign in
                          </button>
                      </form>
                  </div>
          </div>
      </div>
    );
  }
}
Confirm.propTypes = {
  userConfirmRequest: propTypes.func.isRequired,
};
export default connect(null, { userConfirmRequest })(Confirm);
