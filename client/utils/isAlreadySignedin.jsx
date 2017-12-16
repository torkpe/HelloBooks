import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

// is already signed in
/**
 * @param {object} ComposedComponent
 * @return {void}
 */
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
    isAuthenticated: Proptypes.bool.isRequired
  };
  /**
   * @param {object} state
   * @return {object} props
   */
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  return connect(mapStateToProps)(isUserAlreadySignedin);
};
export default isAlreadySignedin;