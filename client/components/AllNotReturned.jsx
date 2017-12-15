import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { allNotReturned } from '../actions/history';
import { getBooks,
  getBorrows, borrowBook,
  returnBook, clearBooks } from '../actions/books';
import Books from './Books.jsx';

/**
 * @class AllNotReturned
 * @classdesc returns the all borrowed books yet to be returned by the user
 */
class AllNotReturned extends Component {
  /**
   * @return {undefined}
   */
  componentWillMount() {
    this.props.allNotReturned(this.props.auth.user.id);
  }
  /**
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearBooks();
  }
  /**
   * renders AllNotRendered component
   *@return {XML} JSX
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
              <h2>Books yet to be returned</h2>
            </span>View all Borrowed books <Link to="/all-borrowed-books">here</Link>
            <hr />
          </div>
          <div className="ask">{this.props.message ? 'this.props.message' : '' }</div>
          <div className="mdl-grid">
            {books.map(book => (<Books
              {...this.props}
                key={book.Book.id}
                book={book.Book}
                borrowBook={this.props.borrowBook}
                returnBook={this.props.returnBook}
                borrowedBook={this.props.borrowed}
            />))}
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
 *
 * @param {oject} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  notReturned: state.allNotReturned,
  message: state.allNotReturned.notReturned.message,
});
export default connect(mapStateToProps, {
  allNotReturned,
  borrowBook,
  returnBook,
  clearBooks,
})(AllNotReturned);
