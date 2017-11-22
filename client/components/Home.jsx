import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBooks, borrowBook, returnBook } from '../actions/books';
import { notify } from '../actions/notification';
import Books from './Books.jsx';

class Home extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    const { books } = this.props;
    return (
      <div className="mdl-grid ">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="ask">{this.props.fetching ? 'Loading' : ''}</div>
          <div className="mdl-grid">
            {books.map(book => (<Books
              {...this.props}
              key={book.id}
              book={book}
              userId={this.props.userId}
              name={this.props.name}
              borrowBook={this.props.borrowBook}
              returnBook={this.props.returnBook}
              successfullyBorrowed={this.props.successfullyBorrowed}
              successfullyReturned={this.props.successfullyReturned}
              borrowedBook={this.props.borrowed}
              notify={this.props.notify}
              category={this.props.auth.user.category}
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
Home.propTypes = {
  getBooks: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  books: state.getBooks.books,
  fetching: state.getBooks.fetching,
  borrowed: state.getBorrows.books,
  userId: state.auth.user.user,
  name: state.auth.user.name,
  successfullyBorrowed: state.borrowBook.successfullyBorrowed,
  successfullyReturned: state.returnBook.successfullyReturned,
});
export default connect(mapStateToProps, {
  getBooks, borrowBook, returnBook, notify,
})(Home);
