import React, { Component } from 'react';

class Confirm extends Component {
        constructor(props) {
        super(props);
        this.state = {
            name: '',
            password1: '',
            password2: '',
            isLoading: false,
            key: this.props.params.key
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.key)
    }
  render() {
    return (
        <div className='mdl-grid'>
                <div className='contents'>
                    <div className="card-enlarge mdl-card mdl-shadow--3dp">
                        <form action="">
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='text' className='mdl-textfield__input'
                                onChange={this.onChange} name='name'  id='name'/>
                                <label htmlFor='email' className='mdl-textfield__label'>Email</label>
                            </div>
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='password' className='mdl-textfield__input'
                                onChange={this.onChange} name='password1' id='password1'/>
                                <label htmlFor='password1' className='mdl-textfield__label'>Password</label>                           
                            </div>
                            <div className='mdl-textfield mdl-js-textfield card-content'>
                                <input type='password2' className='mdl-textfield__input'
                                onChange={this.onChange} name='password2' id='password2'/>
                                <label htmlFor='password2' className='mdl-textfield__label'>Confirm Password</label>                           
                            </div>
                            <button onClick={this.onSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                             id="button">
                            Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
    );
  }
}
export default Confirm;
