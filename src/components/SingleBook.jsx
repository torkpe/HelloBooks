import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import { getABook, borrowBook, returnBook, deleteBook, checkIfBorrowed, clearSingleBook } from '../actions/books';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBorrowed: false,
      checkForBorrowed: null,
    };
  }
  componentDidMount() {
    this.props.getABook(this.props.params.id);
    if (!this.props.auth.user.category) {
      this.props.checkIfBorrowed(this.props.params.id, this.props.auth.user.user);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.checkForBorrowed).length > 1) {
      this.setState({
        isBorrowed: true,
      });
      // console.log(nextProps.checkForBorrowed)
    } else{
      this.setState({
        isBorrowed: false,
      });
    }
    if (nextProps.book.bookQuantity > -1) {
      this.setState({
        quantity: nextProps.book.bookQuantity,
      });
    }
  }
  componentWillUnmount() {
    this.setState({
      isBorrowed: false,
      quantity: undefined,
    });
    this.props.checkForBorrowed.owing = undefined;
    this.props.checkForBorrowed.bookId = undefined;
    this.props.checkForBorrowed.createdAt = undefined;
    this.props.checkForBorrowed.id = undefined;
    this.props.checkForBorrowed.returnDate = undefined;
    this.props.checkForBorrowed.updatedAt = undefined;
    this.props.checkForBorrowed.userId = undefined;
    this.props.checkForBorrowed.returned = undefined;
    this.props.clearSingleBook();
  }
  render() {
    const { fetching, book } = this.props.book;
    const userId = this.props.userId;
    const borrow = (e) => {
      this.props.borrowBook(userId, book.id).then(response =>
        this.setState({
          isBorrowed: true,
          quantity: this.state.quantity - 1,
        }));
    };
    const deleteABook = (e) => {
      this.props.deleteBook(book.id);
    };
    const returnBorrowed = (e) => {
      this.props.returnBook(userId, book.id).then(response =>
        this.setState({
          isBorrowed: false,
          quantity: this.state.quantity + 1,
        }));
    };
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
              {this.props.auth.user.category ? '' : this.state.isBorrowed ? '' :
              <button
                  onClick={borrow}
                  className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Borrow
                </button>
              }
              {this.props.auth.user.category ? '' : this.state.isBorrowed ?
                <button
                  onClick={returnBorrowed}
                  className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    Return
                </button> : ''
              }
              {/* Display for admins only */}
              {this.props.auth.user.category ?
                <Link to={`/edit-book/${book.id}`}
                  className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  Edit
                </Link>
                : ''
              }
              <Link to={`/read-book/${book.id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Read online
              </Link>
              {this.props.auth.user.category ?
                <div>
                  <button
                    onClick={deleteABook}
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                      Delete
                  </button>
                </div>
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
const mapStateToProps = state => ({
  book: state.getABook,
  userId: state.auth.user.user,
  checkForBorrowed: state.checkIfBorrowed.book,
});

export default connect(mapStateToProps, {
  getABook,
  borrowBook,
  returnBook,
  deleteBook,
  checkIfBorrowed,
  clearSingleBook,
})(Book);
