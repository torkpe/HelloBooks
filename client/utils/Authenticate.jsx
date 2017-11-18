import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

export const Authenticate = (ComposedComponent) => {
  class AuthenticateUser extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        return browserHistory.push('/signin');
      }
      return null;
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
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  return connect(mapStateToProps)(AuthenticateUser);
};
export default Authenticate;
