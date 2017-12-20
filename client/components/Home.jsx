import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBooks } from '../actions/books';
import { getAllBorrowed } from '../actions/history';
import Books from './Books.jsx';

/**
 * @class Home
 * @classdesc returns Home component
 */
class Home extends Component {
  /**
   * @return {undefined}
   */
  componentDidMount() {
    if (this.props.userId) {
      this.props.getBooks();
    }
  }
  /**
   * rendersHome component
   * @return {XML} JSX
   */
  render() {
    const { books, borrowedBooks, auth } = this.props;
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
  getAllBorrowed: propTypes.func.isRequired,
  borrowedBooks: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};
/**
 * return props
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  books: state.getBooks.books,
  fetching: state.getBooks.fetching,
  userId: state.auth.user.id,
  borrowedBooks: state.getAllBorrowed
});
export default connect(mapStateToProps, {
  getBooks,
  getAllBorrowed
})(Home);
