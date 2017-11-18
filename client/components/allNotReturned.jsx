import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { allNotReturned } from '../actions/history';
import { getBooks, getBorrows, borrowBook, returnBook, clearBooks } from '../actions/books';
import Books from './Books.jsx';

class notReturned extends Component {
  componentWillMount() {
    this.props.allNotReturned(this.props.auth.user.user);
  }
  componentWillUnmount() {
    this.props.clearBooks();
  }
  render() {
    const books = this.props.notReturned.notReturned;
    return (
      <div className="mdl-grid ">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="contents">
            <span className="ask">
              <h2>Books yet to be returned</h2>
            </span>View all Borrowed books <Link to="/all_borrowed_books">here</Link>
            <hr />
          </div>
          <div className="ask">{this.props.loading ? 'Loading...' : ''}</div>
          <div className="mdl-grid">
            {books.map(book => (<Books
              {...this.props}
                key={book.Book.id}
                book={book.Book}
                userId={this.props.userId}
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

const mapStateToProps = state => ({
  notReturned: state.allNotReturned,
  loading: state.allNotReturned.isLoading,
});
export default connect(mapStateToProps, {
  allNotReturned,
  borrowBook,
  returnBook,
  clearBooks,
})(notReturned);
