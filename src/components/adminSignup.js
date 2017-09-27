import React, { Component } from 'react';
import { Link } from 'react-router';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';
import { userSignupRequest } from '../actions/index';

import Loading from './Loading';

class adminSignup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            signupType:'admin',
            loading: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.userSignupRequest(this.state)
    }
    render(){
        const {errors, isLoading } = this.props.adminSignup
        return(
            <div className='mdl-grid'>
                <Loading isLoading={isLoading} />                                               
                <div className='contents'>
                    <div className="card-enlarge mdl-card mdl-shadow--3dp">
                        <form onSubmit={this.onSubmit}>
                            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                                <input type='email' onChange={this.onChange}
                                className='mdl-textfield__input' name='email' />
                                <label htmlFor='email' className='mdl-textfield__label'>Email</label>
                                <span className="error">{ errors.message }</span>
                            </div>
                            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                                <input type='password' onChange={this.onChange}
                                className='mdl-textfield__input' name='password1' />
                                <label htmlFor='password' className='mdl-textfield__label'>Password</label>
                                <span className="error">{ errors.message }</span>
                            </div>
                            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                                <input type='password' onChange={this.onChange}
                                className='mdl-textfield__input' name='password2' />
                                <label htmlFor='password' className='mdl-textfield__label'>Confirm Password</label>
                                <span className="error">{ errors.message }</span>
                            </div>
                            <button disabled  = {isLoading} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
                                Sign up
                            </button>
                        </form>
                        <Link to ='dshbskj'>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="button">
                                Google+
                            </button>
                        </Link>
                        <div className='mdl-card__supporting-text ask'>
                            Already have an account? Sign in below
                        </div>
                        <Link to ='/signin'>
                            <button className="mdl-button mdl-js-button mdl-button--raised" id="button">
                                Sign in
                            </button>
                        </Link>
                    </div>                    
                </div>
            </div>
        )
    }
}
adminSignup.propTypes = {
    userSignupRequest: propTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        adminSignup: state.signup
    }
}
export default connect(mapStateToProps, { userSignupRequest })(adminSignup);
