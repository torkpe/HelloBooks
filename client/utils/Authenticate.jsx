import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { logout } from '../actions/user';
/**
 * @param {object} ComposedComponent
 * @return {void}
 */
export const Authenticate = (ComposedComponent) => {
  class AuthenticateUser extends Component {
    componentWillMount() {
      jwt.verify(window.localStorage.getItem('jwt'), 'khdbhkdwbfjkwenbfkwjenfkwebfhjwebfuerkwbfkwefnjkw', (error, decoded) => {
        if (error) {
          this.props.logout();
          return browserHistory.push('/signin');
        }
        return null;
      });
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        return browserHistory.push('/');
      }
      return null;
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  AuthenticateUser.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired,
  };
  /**
   * return props
   * @param {object} state
   * @return {object} props
   */
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  return connect(mapStateToProps, { logout })(AuthenticateUser);
};
export default Authenticate;
