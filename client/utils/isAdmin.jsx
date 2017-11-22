import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

// Is not admin
const isAdmin = (ComposedComponent) => {
  class isAnAdmin extends Component {
    componentWillMount() {
      if (!this.props.category) {
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
    category: Proptypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    category: state.auth.user.category,
  });
  return connect(mapStateToProps)(isAnAdmin);
};

export default isAdmin;
