import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllBorrowed } from '../actions/history';
import { clearBooksState } from '../actions/books';
import Books from './Books.jsx';


/**
 * @class AllBorrowed
 * @classdesc returns the all borrowed books of the user
 */
class AllBorrowed extends Component {
  /**
   * @param {object} props
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      isProperties: true,
    };
  }
  /**
   * @return {undefined}
   */
  componentWillMount() {
    this.props.getAllBorrowed(this.props.auth.user.id);
  }
  /**
   *
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.getAllBorrowedBooks) {
      this.setState({
        isProperties: false,
      });
    }
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
            <h1> All Borrowed Books </h1>
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
              />)) : this.state.isProperties ?
                <div className="contents">
                You have not borrowed any book at this point in time
                </div> :
                ''}
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
