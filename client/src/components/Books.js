import React, { Component } from 'react';
import { Link } from 'react-router';

class Books extends Component {
  constructor(props){
    super(props);
    const book = this.props.book
    const userId = this.props.borrowedUserId
    const data={
      user: this.props.name,
      userId: userId,
      type: 'admin',
      message: `${this.props.name} just borrowed the book https://hellobooks-project.herokuapp.com/api/books/'>${book.title}</a>`,
      bookId: book.id
    }
    const data2={
      user: this.props.name,
      userId: userId,
      type: 'admin',
      message: `${this.props.name} just returned the book <a href='https://hellobooks-project.herokuapp.com/api/books/${book.id}'>${book.title}</a>`,
      bookId: book.id
    }
    const data3={
      user: this.props.name,
      userId: this.props.borrowedUserId,
      type: 'user',
      message: `The Admin just charged you for exceeding the deadline ${book.id}`,
      bookId: book.id
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.successfullyBorrowed) {
      return this.props.notify(this.data)
    }
    if (nextProps.successfullyReturned) {
      return this.props.notify(this.data2)
    }
    if (nextProps.successfullyCharged) {
      return this.props.notify(this.data3)
    }
  }
  render() {

    const borrow=(e)=>{
      e.preventDefault()
      this.props.borrowBook(this.userId, this.book.id, this.data)
    }
    const returnBorrowed=(e)=>{
      e.preventDefault()
      this.props.returnBook(this.userId, this.book.id, this.data2)
    }
    const chargeUser = (e) => {
      this.props.charge(this.userId, this.book.id, this.data3)
    }
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <div className="demo-card-square mdl-card mdl-shadow--2dp home-card contents">
          <div className="mdl-card__title mdl-card--expand">
            <h2 className="mdl-card__title-text">{this.book.title}</h2>
          </div>
            <img src={this.book.cover} alt="Book cover"/>
          <div className="mdl-card__supporting-text">
            {this.book.description}
          </div>
          <div className="mdl-card__actions mdl-card--border">
            { this.props.charge ? '' :
            <a onClick={this.borrow}
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
                charge
              </a>
            : ''}
            <Link to = {`single/${this.book.id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Books;
