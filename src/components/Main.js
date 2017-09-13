import React, { Component } from 'react';
import {Link} from 'react-router';
import './Main.css';
import './mdl/material.min.css';
class Main extends Component {
    render(){
        return(
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title"><Link to ='/'>hello-books</Link></span>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                    </nav>
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
export default Main;
