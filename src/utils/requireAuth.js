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
                if(this.props.category){
                    browserHistory.push('/admin_home')
                }else{
                    browserHistory.push('/home');
                }
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
                );
            }
        }
isAlreadySignedin.propTypes = {
    isAuthenticated: Proptypes.bool.isRequired,
    category: Proptypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        category: state.auth.user.category
    }
}
return connect(mapStateToProps)(isAlreadySignedin);
}
// Is user
export const isUser = (ComposedComponent) => {
    class isUser extends Component {
        componentWillMount() {
            if(this.props.category){
                browserHistory.push('/restrict/User')
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
                );
            }
        }
isAlreadySignedin.propTypes = {
    category: Proptypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        category: state.auth.user.category
    }
}
return connect(mapStateToProps)(isUser);
}
// Is not admin
export const isAdmin = (ComposedComponent) => {
    class isAdmin extends Component {
        componentWillMount() {
            if(!this.props.category){
                browserHistory.push('/restrict/Admin')
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
                );
            }
        }
isAlreadySignedin.propTypes = {
    category: Proptypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        category: state.auth.user.category
    }
}
return connect(mapStateToProps)(isAdmin);
}
