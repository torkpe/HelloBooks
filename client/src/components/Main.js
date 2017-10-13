import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './Main.css';
import './mdl/material.min.css';
import { logout } from '../actions/index';
import { notifications,
     home,
     adminHome,
     log,
     allBooks,
     settings,
     history,
     requests
    } from '../actions/routes';

class Main extends Component {
    logout(e) {
        e.preventDefault();
        this.props.logout()
    }
    notifications(e) {
        e.preventDefault();
        this.props.notifications()
    }
    adminHome(e) {
        e.preventDefault();
        this.props.adminHome()
    }
    log(e) {
        e.preventDefault();
        this.props.log()
    }
    requests(e) {
        e.preventDefault();
        this.props.requests()
    }
    allBooks(e) {
        e.preventDefault();
        this.props.allBooks()
    }
    home(e) {
        e.preventDefault();
        this.props.home()
    }
    history(e) {
        e.preventDefault();
        this.props.history()
    }
    settings(e) {
        e.preventDefault();
        this.props.settings()
    }
    render(){
        const { isAuthenticated } = this.props.auth;
        const { category } =this.props.auth.user
        const determineNav =(category) =>{
            if(category===true){
                return (
                   <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" onClick={this.adminHome.bind(this)} href="">Home</a>
                        <a className="mdl-navigation__link" onClick={this.requests.bind(this)} href="">Requests</a>
                        <a className="mdl-navigation__link" onClick={this.notifications.bind(this)} href="">Notifications</a>
                        <a className="mdl-navigation__link" onClick={this.log.bind(this)} href="">Logs</a>
                        <a className="mdl-navigation__link" onClick={this.allBooks.bind(this)} href="">All Books</a>                       
                   </nav>
                )
            }else if(category===false){
            return (
                <nav className="mdl-navigation navLink">
                    <a className="mdl-navigation__link" onClick={this.home.bind(this)} href="">Home</a>
                    <a className="mdl-navigation__link" onClick={this.history.bind(this)} href="">History</a>
                    <a className="mdl-navigation__link" onClick={this.settings.bind(this)} href="">Settings</a>
                    <a className="mdl-navigation__link" onClick={this.notifications.bind(this)} href="">Notifications</a>
                </nav>
                )
            }
        }
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
                </header>
                  <div className="mdl-layout__drawer">
                    <Link to ={category ? '/admin_home' : '/'} className="mdl-layout-title">hello-books</Link>
                        {determineNav(category)}
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
export default connect(mapStateToProps,
    {
        logout,
        notifications,
        home,
        adminHome,
        log,
        allBooks,
        settings,
        history,
        requests 
    })(Main);
