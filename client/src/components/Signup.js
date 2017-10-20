import React, { Component } from 'react';
import { Link } from 'react-router';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';
import { userSignupRequest } from '../actions/index';

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            signupType:'user',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(checker){
            if (checker===true) {
              return (<div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>)
        }
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.userSignupRequest(this.state)
        this.refs.signupForm.reset();
    }
    render(){
        const {errors, isLoading } = this.props.signup
        const span =<span></span>
        return(
            <div className='mdl-grid'>
                <div className='contents'>
                    <div className="card-enlarge mdl-card mdl-shadow--3dp">
                        {this.componentDidMount({isLoading})}
                        <form ref='signupForm' onSubmit={this.onSubmit}>
                            <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                                <input type='email' onChange={this.onChange}
                                className='mdl-textfield__input' name='email' />
                                <label htmlFor='email' className='mdl-textfield__label'>Email</label>
                                <span className="error">{ errors.message }</span>
                            </div>
                            <button disabled = {isLoading} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
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
Signup.propTypes = {
    userSignupRequest: propTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        signup: state.signup
    }
}
export default connect(mapStateToProps, { userSignupRequest })(Signup);
