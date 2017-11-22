import React, { Component } from 'react';
import { Link } from 'react-router';

class Books extends Component {
  render() {
    const book = this.props.book;
    const userId = this.props.borrowedUserId;
    const borrow = (e) => {
      e.preventDefault();
      this.props.borrowBook(userId, book.id);
    };
    const returnBorrowed = (e) => {
      e.preventDefault();
      this.props.returnBook(userId, book.id);
    };
    const chargeUser = (e) => {
      this.props.charge(userId, book.id);
    };
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <div className="demo-card-square mdl-card mdl-shadow--2dp home-card contents">
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text">{book.title}</h2>
          </div>
          <img src={book.cover} alt="Book cover" />
          <div className="mdl-card__supporting-text">
            {book.description}
          </div>
          <div className="mdl-card__actions mdl-card--border">
            { this.props.charge ?
              <button
                onClick={chargeUser}
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  charge
              </button>
              : ''}
            <Link to={`single/${book.id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Details
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Books;
