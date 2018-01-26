import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

import {
  getABook, borrowBook,
  returnBook, deleteBook,
  checkIfBorrowed, clearSingleBookState,
  clearBorrowBookState,
  clearDeleteBookState
} from '../actions/books';

/**
 * @classdesc Returns Book component
 */
class Book extends Component {
  /**
   * @description Created an instance of Settings
   * 
   * @param {object} props
   * 
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      isBorrowed: false,
    };
  }
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentDidMount() {
    this.props.getABook(this.props.params.id);
    if (!this.props.auth.user.isAdmin) {
      this.props.checkIfBorrowed(this.props.params.id, this.props.auth.user.id);
    }
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const {
      checkForBorrowed, book,
      borrowBookError, bookDeleted
    } = nextProps;
    if (Object.keys(checkForBorrowed).length > 1 &&
    checkForBorrowed.bookId === parseInt(this.props.params.id, 10)) {
      this.setState({
        isBorrowed: true,
      });
    } else {
      this.setState({
        isBorrowed: false,
      });
    }
    if (book.bookQuantity > -1) {
      this.setState({
        quantity: book.bookQuantity,
      });
    }
    if (borrowBookError) {
      toastr.error(borrowBookError);
    }
    if (Object.keys(bookDeleted.response).length > 0) {
      toastr.success(bookDeleted.response.message);
      this.props.clearDeleteBookState();
      browserHistory.push('/home');
    }
    if (Object.keys(bookDeleted.error).length > 0) {
      toastr.error(bookDeleted.error.message);
    }
  }
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearSingleBookState();
    this.props.clearDeleteBookState();
    this.props.clearBorrowBookState();
  }
  /**
   * @description Renders component
   * 
   * @return {XML} JSX
   */
  render() {
    const { fetching, book } = this.props.book;
    const { userId } = this.props;
    /**
     * @description Handles borrow book action
     * 
     * @return {undefined}
     */
    const borrow = () => {
      this.props.clearBorrowBookState();
      this.props.borrowBook(userId, book.id).then((response) => {
        if (response.type !== "FAILED_TO_BORROW_BOOK") {
          this.setState({
            isBorrowed: true,
            quantity: this.state.quantity - 1,
          });
        }
      });
    };
    /**
     * @description Handles delete book action
     * 
     * @return {undefined}
     */
    const deleteABook = () => {
      this.props.deleteBook(book.id);
    };
    /**
     * @description Handles return book action
     * 
     * @return {undefined}
     */
    const returnBorrowed = () => {
      this.props.returnBook(userId, book.id).then(response =>
        this.setState({
          isBorrowed: false,
          quantity: this.state.quantity + 1,
        }));
    };
    const { isAdmin } = this.props.auth.user;
    const mdlStyleButton = `
    mdl-button
    mdl-button--colored
    mdl-js-button
    mdl-js-ripple-effect
    `;
    return (
      <div className="mdl-grid">
        {Object.keys(book).length > 0 &&
        <div className="contents">
          <div className="demo-card-square mdl-card mdl-shadow--2dp contents">
            <img src={book.cover} alt={book.title} />
            <div className="mdl-card__supporting-text">
              Title: {book.title}
              <br />
              Author: {book.author}
              <br />
              Description: {book.description}
              <br />
              Quantity: {this.state.quantity}
              <br />
              Genre: {book.genre}
            </div>
            <div className="mdl-card__actions mdl-card--border">
              {/* Display for users only */}
              {isAdmin ? '' : this.state.isBorrowed ? '' :
              <button
                  onClick={borrow}
                  name="borrow"
                  className="btn btn-default">
                Borrow
              </button>
              }
              {isAdmin ? '' : this.state.isBorrowed ?
                <button
                  onClick={returnBorrowed}
                  name="return"
                  className="btn btn-success">
                    Return
                </button> : ''
              }
              {/* Display for admins only */}
              {isAdmin ?
                <Link
                  to={`/edit-book/${book.id}`}
                  name="edit"
                  className="glyphicon glyphicon-edit">
                </Link>
                : ''
              }
              <Link
                to={`/read-book/${book.id}`}
                name="read"
                className="glyphicon glyphicon-eye-open">
              </Link>
              {isAdmin ?
                <span
                  onClick={deleteABook}
                  name="deleteBook"
                  className="glyphicon glyphicon-trash" />
                :
                ''
              }
            </div>
          </div>
        </div>
        }
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
  book: state.getABook,
  userId: state.auth.user.id,
  checkForBorrowed: state.checkIfBorrowed.book,
  borrowBookError: state.borrowBook.errors.message,
  bookDeleted: state.deleteBook
});

export default connect(mapStateToProps, {
  getABook,
  borrowBook,
  returnBook,
  deleteBook,
  checkIfBorrowed,
  clearSingleBookState,
  clearBorrowBookState,
  clearDeleteBookState
})(Book);
