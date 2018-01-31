import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { allNotReturned } from '../actions/history';
import { getBooks,
  getBorrows, borrowBook,
  returnBook, clearBooksState } from '../actions/books';
import Books from './Books.jsx';

/**
 * @classdesc Returns the all borrowed books yet to be returned by the user
 */
export class AllNotReturned extends Component {
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentWillMount() {
    this.props.allNotReturned(this.props.auth.user.id);
  }
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearBooksState();
  }
  /**
   * @description Renders AllNotRendered component
   * 
   * @return {XML} JSX
   */
  render() {
    const books = this.props.notReturned.notReturned;
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="contents">
            <span className="ask">
              <h5>Books yet to be returned</h5>
            </span>
            View all Borrowed books <Link to="/all-borrowed-books">here</Link>
            <hr />
          </div>
          <div className="ask">
            {this.props.message ? 'this.props.message' : '' }
          </div>
          <div className="mdl-grid">
            { books && books.length > 0 ? books.map(book => (<Books
              {...this.props}
                key={book.Book.id}
                book={book.Book}
                borrowBook={this.props.borrowBook}
                returnBook={this.props.returnBook}
                borrowedBook={this.props.borrowed}
            />)) :
            <div className="contents">
              <h5>
                You have not borrowed any book at this point in time
              </h5>
            </div>
              }
          </div>
          <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
        </div>
        <div className="mdl-cell mdl-cell--1-col" />
      </div>
    );
  }
}

/**
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  notReturned: state.allNotReturned,
  message: state.allNotReturned.notReturned.message,
});
export default connect(mapStateToProps, {
  allNotReturned,
  borrowBook,
  returnBook,
  clearBooksState,
})(AllNotReturned);
