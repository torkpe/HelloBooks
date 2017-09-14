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
        const userLinks = (
            <nav className="mdl-navigation mdl-layout--large-screen-only">
                <a className="mdl-navigation__link" onClick={this.logout.bind(this)} href="">Signout</a>
            </nav>
        );
        const guestLinks = (
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <a className="mdl-navigation__link" href="">Signin</a>
                        <a className="mdl-navigation__link" href="">Signup</a>
                    </nav>
        )
        return(
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title"><Link to ='/'>hello-books</Link></span>
                        <div className="mdl-layout-spacer"></div>
                        { isAuthenticated ? userLinks : guestLinks}    
                    </div>
                </header>
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
                        <li><a href="#">Help</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </span>
            </footer>
            </div>          
        )
    }
}

Main.prototypes = {
    auth: Proptypes.object.isRequired,
    logout: Proptypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Main);
