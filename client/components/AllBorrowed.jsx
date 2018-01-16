import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllBorrowed } from '../actions/history';
import { clearBooksState } from '../actions/books';
import Books from './Books.jsx';


/**
 * @class AllBorrowed
 * @classdesc returns the all borrowed books of the user
 */
export class AllBorrowed extends Component {
  /**
   * @return {undefined}
   */
  componentWillMount() {
    this.props.getAllBorrowed(this.props.auth.user.id);
  }
  /**
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearBooksState();
  }
  /**
   * renders ALlBorrowed component
   * @return {XML} JSX
   */
  render() {
    const books = this.props.getAllBorrowedBooks.borrowedBooks;
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="ask">
            <h5> All Borrowed Books </h5>
            <hr />
          </div>
          <div className="ask">{this.props.loading ? 'Loading...' : ''}</div>
          <div className="mdl-grid">
            {books && books.length > 0 ?
              books.map((book, index) => (<Books
                {...this.props}
                key={index}
                book={book.Book}
                borrowBook={this.props.borrowBook}
                returnBook={this.props.returnBook}
                borrowedBook={this.props.borrowed}
              />)) :
                <div className="contents">
                  <h5>You have no record of borrowed books</h5>
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
 *
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  getAllBorrowedBooks: state.getAllBorrowed,
  loading: state.getAllBorrowed.isLoading,
});
export default connect(mapStateToProps, {
  getAllBorrowed,
  clearBooksState,
})(AllBorrowed);
