import React, { Component } from 'react';
import { Link } from 'react-router';

class Signin extends Component {
  render() {
    return (
            <div className='mdl-grid'>
                <div className='contents'>
                    <div className="card-enlarge mdl-card mdl-shadow--3dp">
                        <form action="">
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='email' className='mdl-textfield__input' id='email'/>
                                <label htmlFor='email' className='mdl-textfield__label'>Email</label>
                            </div>
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='password' className='mdl-textfield__input' id='password'/>
                                <label htmlFor='password' className='mdl-textfield__label'>Password</label>                           
                            </div>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
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

export default Signin;
