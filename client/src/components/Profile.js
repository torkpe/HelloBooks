import React, { Component } from 'react';
import { Link } from 'react-router';

class Profile extends Component {

  render() {
    return (
        <div className='mdl-grid'>                                               
            <div className='contents'>
                <div className="card-enlarge mdl-card mdl-shadow--3dp">
                    <form onSubmit={this.onSubmit}>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='email' onChange={this.onChange}
                            className='mdl-textfield__input' disabled={true} value={'snsknskj'} name='email' />
                            <span className="error"></span>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='text' onChange={this.onChange}
                            className='mdl-textfield__input' name='name' />
                            <label htmlFor='fullname' className='mdl-textfield__label'>Full Name</label>
                            <span className="error"></span>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='password'
                            className='mdl-textfield__input' name='oldPassword' />
                            <label htmlFor='password' className='mdl-textfield__label'>Password</label>
                            <span className="error"></span>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='password' onChange={this.onChange}
                            className='mdl-textfield__input' name='password2' />
                            <label htmlFor='password' className='mdl-textfield__label'>Confirm Password</label>
                            <span className="error"></span>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='password' onChange={this.onChange}
                            className='mdl-textfield__input' name='password2' />
                            <label htmlFor='password' className='mdl-textfield__label'>Confirm Password</label>
                            <span className="error"></span>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
                            Sign up
                        </button>
                    </form>
                </div>                    
            </div>
        </div>
    );
  }
}

export default Profile;
