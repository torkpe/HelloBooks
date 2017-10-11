import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUser } from '../actions/getUser';
import { updateUser } from '../actions/updateUser';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            name:''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        console.log(this.props.auth.user.user)
        this.props.getUser(this.props.auth.user.user)
    }
    onChange(e){
        e.preventDefault()
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        this.props.updateUser(this.props.auth.user.user,this.state)
    } 
  render() {
    return (
        <div className='mdl-grid'>                                               
            <div className='contents'>
                <div className="card-enlarge mdl-card mdl-shadow--3dp">
                {Object.keys(this.props.user).length > 0 && <form onSubmit={this.onSubmit}>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='email' onChange={this.onChange}
                            className='mdl-textfield__input' disabled={true} value={this.props.user.email} name='email' />
                            <span className="error"></span>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='text' onChange={this.onChange}
                                className='mdl-textfield__input' defaultValue={
                                    this.props.user.name
                                } name='name' />
                            <span className="error"></span>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
                            update
                        </button>
                    </form>
                }
                    <div>
                        <Link to = '/set-password'>Set Password </Link>
                    </div>
                </div>                    
            </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.getUser.user
    }
}
export default connect(mapStateToProps, {getUser, updateUser})(Profile);
