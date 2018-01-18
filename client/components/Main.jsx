import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import '../styles/Main.scss';
import '../styles/mdl/material.min.css';
import { logout } from '../actions/user';
import { notifications,
  home,
  uploadBook,
  allBooks,
  settings,
  history,
} from '../actions/routes';

/**
 * @classdesc returns wrapper for other components
 */
export class Main extends Component {
  /**
   * @description Calls settings action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  settings(event) {
    event.preventDefault();
    this.props.settings();
  }
  /**
   * @description Calls allBooks action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  allBooks(event) {
    event.preventDefault();
    this.props.allBooks();
  }
  /**
   * @description Calls home action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  home(event) {
    event.preventDefault();
    this.props.home();
  }
  /**
   * @description Calls history action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  history(event) {
    event.preventDefault();
    this.props.history();
  }
  /**
   * @description Calls logout action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  /**
   * @description Calls notifications action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  notifications(event) {
    event.preventDefault();
    this.props.notifications();
  }
  /**
   * @description Calls uploadBook action
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  uploadBook(event) {
    event.preventDefault();
    this.props.uploadBook();
  }
  /**
   * @description Renders Main component
   * 
   * @return {XML} JSX
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const { isAdmin } = this.props.auth.user;
    /**
     * @description Checks if user is admin or regular user
     * 
     * @param {boolean} isanAdmin
     * 
     * @return {XML} JSX
     */
    const determineNav = (isanAdmin) => {
      if (isanAdmin === true) {
        return (
          <nav className="mdl-navigation">
            <a
            className="mdl-navigation__link"
            name="uploadBook"
            onClick={this.uploadBook.bind(this)}
            href="">Upload Book
            </a>
            <a
            className="mdl-navigation__link"
            name="notifications"
            onClick={this.notifications.bind(this)}
            href="">Notifications
            </a>
            <a
            className="mdl-navigation__link"
            name="allBooks"
            onClick={this.allBooks.bind(this)}
            href="">All Books
            </a>
            <a
            className="mdl-navigation__link signout"
            name="signout"
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
            name="home"
            onClick={this.home.bind(this)} href="">
            Home
            </a>
            <a
            className="mdl-navigation__link"
            name="history"
            onClick={this.history.bind(this)}
            href="">History
            </a>
            <a
            className="mdl-navigation__link"
            name="settings"
            onClick={this.settings.bind(this)}
            href="">Settings
            </a>
            <a
            className="mdl-navigation__link"
            name="notifications"
            onClick={this.notifications.bind(this)}
            href="">Notifications
            </a>
            <a
            className="mdl-navigation__link signout"
            name="signout"
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
        name="signout"
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
            to="/" className="mdl-layout-title">
            HelloBooks
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
          HelloBooks
          </Link>
          {determineNav(isAdmin)}
        </div>
        <main className="mdl-layout__content">
          {React.cloneElement(this.props.children, this.props)}
        </main>
      </div>
    );
  }
}
Main.prototypes = {
  auth: Proptypes.object.isRequired,
  logout: Proptypes.func.isRequired,
};
/**
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
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
