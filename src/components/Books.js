import React, { Component } from 'react';

class Books extends Component {
  render() {
    const book = this.props.book
    const userId = this.props.userId
    const data={
      user: this.props.name,
      userId,
      type: 'admin',
      message: `${this.props.name} just borrowed the book <a href='https://hellobooks-project.herokuapp.com/api/books/${book.id}'>${book.title}</a>`
    }
    const data2={
      user: this.props.name,
      userId,
      type: 'admin',
      message: `${this.props.name} just returned the book <a href='https://hellobooks-project.herokuapp.com/api/books/${book.id}'>${book.title}</a>`
    }
    const borrow=(e)=>{
      this.props.borrowBook(userId, book.id, data)
    }
    const returnBorrowed=(e)=>{      
      this.props.returnBook(userId, book.id, data2)
    }
    const chargeUser = (e) => {
      this.props.charge(4, 5)
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
          </div>
          <div className="mdl-card__actions mdl-card--border">
            { this.props.charge ? '' :
            <a onClick={borrow}
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            borrow book
            </a> }
            { this.props.charge ? '' :
            <a onClick={returnBorrowed}
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">              
              return book
            </a>}
            { this.props.charge ?
              <a onClick={chargeUser} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">              
                chage
            </a>
            : ''}
          </div>
        </div>
      </div>
    );
  }
}
export default Books;
