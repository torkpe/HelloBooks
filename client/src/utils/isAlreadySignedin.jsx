import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

// is already signed in
const isAlreadySignedin = (ComposedComponent) => {
  class isUserAlreadySignedin extends Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        if (this.props.category) {
          return browserHistory.push('/admin_home');
        }
        return browserHistory.push('/home');
      }
      return null;
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  isUserAlreadySignedin.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired,
    category: Proptypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    category: state.auth.user.category,
  });
  return connect(mapStateToProps)(isUserAlreadySignedin);
};
export default isAlreadySignedin;