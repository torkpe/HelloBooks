import React, { Component } from 'react';
import propTypes from 'prop-types';

class Books extends Component {
  render() {
    const book = this.props.book
    const borrowed = this.props.borrowed
    const userId = this.props.userId
    const onClick=(e)=>{
    e.preventDefault()
    this.props.borrowBook(userId, book.id)
  }
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <div className="demo-card-square mdl-card mdl-shadow--2dp home-card">
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text">{book.title}</h2>
          </div>
            <img src={book.cover} alt="Book cover"/>
          <div className="mdl-card__supporting-text">
            {book.description}
            
              {this.props.borrowedBook.forEach(function(element) {
               if(element.userId===userId){
                return 'yes'
               }
              })}
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a onClick={onClick} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">              
              borrow book
            </a>
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">              
              return book
            </a>
          </div>
        </div>
      </div>
    );
  }
}
Books.propTypes = {
    borrowBook: propTypes.func.isRequired,
    returnBook: propTypes.func.isRequired,
}
export default Books;
