import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

// Is user
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
    category: Proptypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    category: state.auth.user.category,
  });
  return connect(mapStateToProps)(isAUser);
};
export default isUser;
