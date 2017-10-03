import React, { Component } from 'react';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';

import { getBooks, getBorrows, borrowBook, returnBook } from '../actions/books';
import { notify } from '../actions/notification';
import Books from './Books';

class Home extends Component {
  componentWillMount(){
    this.props.getBooks()
    this.props.getBorrows(this.props.userId)
  }
  render() {
    const books = this.props.books
    console.log(books) 
    return (
      <div className='mdl-grid '>
        <div className="mdl-cell mdl-cell--1-col"></div>
        <div className="mdl-cell mdl-cell--10-col">
          <div className='mdl-grid '>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
          <div className='ask'>{this.props.fetching ? 'Loading' : ''}</div>
          <div className='mdl-grid'>
            {books.map((book)=> <Books
              {...this.props}
              key={book.id}
              book={book}
              userId={this.props.userId}
              name={this.props.name}
              borrowBook={this.props.borrowBook}
              returnBook={this.props.returnBook}
              borrowedBook={this.props.borrowed}
            />)}
          </div>
          <div className='mdl-grid '>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--1-col"></div>
      </div>
    );
  }
}
Home.propTypes = {
    getBooks: propTypes.func.isRequired,
    getBorrows: propTypes.func.isRequired,
}
const mapStateToProps = (state) => {
    return {
        books: state.getBooks.books,
        fetching: state.getBooks.fetching,
        borrowed: state.getBorrows.books,
        userId: state.auth.user.user,
        name: state.auth.user.name
    }
}
export default connect(mapStateToProps, { getBooks, getBorrows, borrowBook, returnBook })(Home);
