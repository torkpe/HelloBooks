import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

const Authenticate = (ComposedComponent) => {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                browserHistory.push('/signin');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
                );
            }
        }
Authenticate.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
return connect(mapStateToProps)(Authenticate);
}
export default Authenticate;
