import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { browserHistory } from 'react-router';

export const Authenticate = (ComposedComponent) => {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                browserHistory.push('/signin');
            }
        }
        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                browserHistory.push('/');
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

//is already signed in
export const isAlreadySignedin = (ComposedComponent) => {
    class isAlreadySignedin extends Component {
        componentWillMount() {
            if (this.props.isAuthenticated) {
                browserHistory.push('/home');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
                );
            }
        }
isAlreadySignedin.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
return connect(mapStateToProps)(isAlreadySignedin);
}
