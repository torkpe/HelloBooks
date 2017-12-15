import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

// Is not admin
/**
 * @param {object} ComposedComponent
 * @return {void}
 */
const isAdmin = (ComposedComponent) => {
  class isAnAdmin extends Component {
    componentWillMount() {
      if (!this.props.isAdmin) {
        return browserHistory.push('/restrict/Admin');
      }
      return null;
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  isAnAdmin.propTypes = {
    isAdmin: Proptypes.bool.isRequired,
  };
  /**
   * @param {object} state
   * @return {object} props
   */
  const mapStateToProps = state => ({
    isAdmin: state.auth.user.isAdmin,
  });
  return connect(mapStateToProps)(isAnAdmin);
};

export default isAdmin;
