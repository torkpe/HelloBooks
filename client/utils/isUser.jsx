import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 * @description Check if it is a user
 * 
 * @param {object} ComposedComponent
 * 
 * @return {void}
 */
const isUser = (ComposedComponent) => {
  class isAUser extends Component {
    componentWillMount() {
      if (this.props.category) {
        browserHistory.push('/restrict/User');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  isAUser.propTypes = {
    isAdmin: Proptypes.bool.isRequired,
  };
  /**
   * @description Map state to props
   * 
   * @param {object} state
   * 
   * @return {object} props
   */
  const mapStateToProps = state => ({
    isAdmin: state.auth.user.isAdmin,
  });
  return connect(mapStateToProps)(isAUser);
};
export default isUser;
