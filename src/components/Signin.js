import React, { Component } from 'react';
import { Link } from 'react-router';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { userSigninRequest } from '../actions/index';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errors: {},
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }
    onSubmit(e) {
        this.setState({ errors: {}, isLoading: true })
        e.preventDefault()
        this.props.userSigninRequest(this.state).then(
            () => {
                browserHistory.push('/home');
            },
            ({response}) => this.setState({ errors: response.data, isLoading: false }),
            console.log(this.state)
        )
    }
  render() {
    return (
            <div className='mdl-grid'>
                <div className='contents'>
                    <div className="card-enlarge mdl-card mdl-shadow--3dp">
                        <form onSubmit={this.onSubmit}>
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='email' className='mdl-textfield__input' name='email' id='email'/>
                                <label htmlFor='email' className='mdl-textfield__label'>Email</label>
                            </div>
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='password' className='mdl-textfield__input' name='password' id='password'/>
                                <label htmlFor='password' className='mdl-textfield__label'>Password</label>                           
                            </div>
                            <button disabled = {this.state.isLoading} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
                            Sign in
                            </button>
                        </form>
                        <Link>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="button">
                            Sign in with Google+
                            </button>
                        </Link>
                        <div className='mdl-card__supporting-text ask'>
                            Don't Have an Account yet? Create one Below
                        </div>
                        <Link to ='/signup'>
                            <button className="mdl-button mdl-js-button mdl-button--raised" id="button">
                            Create Account
                            </button>
                        </Link>
                        <div className='mdl-card__supporting-text ask'>
                            <a href=''>forgot password?</a>          
                        </div>
                    </div>
                </div>
            </div>
        
    );
  }
}

Signin.propTypes = {
    userSigninRequest: propTypes.func.isRequired
}
export default connect(null, { userSigninRequest })(Signin);

