import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './Main.css';
import './mdl/material.min.css';
import { logout } from '../actions/user';
import { notifications,
  home,
  uploadBook,
  allBooks,
  settings,
  history,
} from '../actions/routes';
/**
 * @class Main
 * @classdesc rreturns wrapper for other components
 */
class Main extends Component {
  /**
   * @param {object} event
   * @return {undefined}
   */
  settings(event) {
    event.preventDefault();
    this.props.settings();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  allBooks(event) {
    event.preventDefault();
    this.props.allBooks();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  home(event) {
    event.preventDefault();
    this.props.home();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  history(event) {
    event.preventDefault();
    this.props.history();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  notifications(event) {
    event.preventDefault();
    this.props.notifications();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  uploadBook(event) {
    event.preventDefault();
    this.props.uploadBook();
  }
  /**
   * renders Main component
   * @return {XML} JSX
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const { isAdmin } = this.props.auth.user;
    /**
     * @param {boolean} isanAdmin
     * @return {XML} JSX
     */
    const determineNav = (isanAdmin) => {
      if (isanAdmin === true) {
        return (
          <nav className="mdl-navigation">
            <a
            className="mdl-navigation__link"
            onClick={this.uploadBook.bind(this)}
            href="">Upload Book
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.notifications.bind(this)}
            href="">Notifications
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.allBooks.bind(this)}
            href="">All Books
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.logout.bind(this)} href="">
            Signout
            </a>
          </nav>
        );
      } else if (isanAdmin === false) {
        return (
          <nav className="mdl-navigation navLink">
            <a
            className="mdl-navigation__link"
            onClick={this.home.bind(this)} href="">
            Home
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.history.bind(this)}
            href="">History
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.settings.bind(this)}
            href="">Settings
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.notifications.bind(this)}
            href="">Notifications
            </a>
            <a
            className="mdl-navigation__link"
            onClick={this.logout.bind(this)}
            href="">Signout
            </a>
          </nav>
        );
      }
    };
    const mdlStyle = `mdl-textfield 
    mdl-js-textfield 
    mdl-textfield--expandable 
    mdl-textfield--align-right`;
    const userLinks = (
      <nav className="mdl-navigation">
        <a
        className="mdl-navigation__link"
        onClick={this.logout.bind(this)} href="">
        Signout
        </a>
      </nav>
    );
    const guestLinks = (
      <nav className="mdl-navigation">
        <Link to="/signin"className="mdl-navigation__link">Signin</Link>
        <Link to="/signup" className="mdl-navigation__link">Signup</Link>
      </nav>
    );
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <Link
            to={isAdmin ? '/admin_home' : '/'}className="mdl-layout-title">
            hello-books
            </Link>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-layout--large-screen-only">
              { isAuthenticated ? userLinks : guestLinks}
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <Link
          to={isAdmin ? '/admin_home' : '/'} className="mdl-layout-title">
          hello-books
          </Link>
          {determineNav(isAdmin)}
        </div>
        <main className="mdl-layout__content">
          {React.cloneElement(this.props.children, this.props)}
        </main>
        <footer className="mdl-mini-footer">
          <span className="mdl-mini-footer--left-section">
            <span className="mdl-logo">Hello-Books</span>
            <ul className="mdl-mini-footer--link-list" />
          </span>
        </footer>
      </div>
    );
  }
}
Main.prototypes = {
  auth: Proptypes.object.isRequired,
  logout: Proptypes.func.isRequired,
};
/**
 * @param {object} state
 * @return {undefined}
 */
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  {
    logout,
    notifications,
    home,
    uploadBook,
    allBooks,
    settings,
    history,
  }
)(Main);
