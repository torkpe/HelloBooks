import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './Main.css';
import './mdl/material.min.css';
import { logout } from '../actions/index';

class Main extends Component {
    logout(e) {
        e.preventDefault();
        this.props.logout()
    }
    render(){
        const { isAuthenticated } = this.props.auth;
        const { category } =this.props.auth.user
        const userLinks = (
            <nav className="mdl-navigation">
                <a className="mdl-navigation__link" onClick={this.logout.bind(this)} href="">Signout</a>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                    <label className="mdl-button mdl-js-button mdl-button--icon"
                        htmlFor="waterfall-exp">
                    <i className="material-icons">search</i>
                    </label>
                    <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" name="sample"
                            id="waterfall-exp" />
                    </div>
                </div>
            </nav>
        );
        const guestLinks = (
                <nav className="mdl-navigation">
                    <Link to='/signin' className="mdl-navigation__link">Signin</Link>
                    <Link to='/signup' className="mdl-navigation__link">Signup</Link>
                </nav>
        )
        const determineNav =(category, authenticated) =>{
            if(category===true && authenticated === true){
                return (
                   <div>
                        <Link to='/admin_home' className="mdl-layout__tab">Home</Link>
                        <Link to='/requests' className="mdl-layout__tab">Requests</Link>
                        <Link to='/notification' className="mdl-layout__tab">Notifications</Link>
                        <Link to='/log' className="mdl-layout__tab">Log</Link>
                        <Link to='/all_books' className="mdl-layout__tab">All Books</Link>
                        
                   </div>
                )
            }else if(category===false && authenticated===true){
            return (
                <div>
                    <Link to='/home' className="mdl-layout__tab">Home</Link>
                    <Link to='/history' className="mdl-layout__tab">History</Link>
                    <Link to='/settings' className="mdl-layout__tab">Settings</Link>
                </div>
                )
            }
        }
        return(
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <Link to ={category? '/admin_home' : '/'} className="mdl-layout-title">hello-books</Link>
                        <div className="mdl-layout-spacer"></div>
                        <nav className='mdl-layout--large-screen-only'>
                            { isAuthenticated ? userLinks : guestLinks}
                        </nav>
                    </div>
                    {/*display navbar for admin if authnt*/}
                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                        {determineNav(category, isAuthenticated)}
                    </div>
                </header>
                  <div className="mdl-layout__drawer">
                    <Link to ={category ? '/admin_home' : '/'} className="mdl-layout-title">hello-books</Link>
                        { isAuthenticated ? userLinks : guestLinks}
                  </div>
                <main className='mdl-layout__content'>
                    {React.cloneElement(this.props.children, this.props)}
                </main>
                <footer className='mdl-mini-footer'>
                <span className='mdl-mini-footer--left-section'>
                    <span className='mdl-logo'>Hello-Books</span>
                    <ul className='mdl-mini-footer--link-list'>
                    </ul>
                </span>
                <span className='mdl-mini-footer--right-section'>
                    <ul className='mdl-mini-footer--link-list'>
                        <li><a href="">Help</a></li>
                        <li><a href="">About</a></li>
                    </ul>
                </span>
            </footer>
            </div>          
        )
    }
}
Main.prototypes = {
    auth: Proptypes.object.isRequired,
    logout: Proptypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Main);
