import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllBorrowed } from '../actions/history';
import Books from './Books';

class allBorrowed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProperties: true,
    };
  }
  componentWillMount() {
    this.props.getAllBorrowed(this.props.auth.user.user);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getAllBorrowedBooks) {
      this.setState({
        isProperties: false,
      });
    }
  }
  render() {
    const books = this.props.getAllBorrowedBooks.borrowedBooks;
    return (
      <div className="mdl-grid ">
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
              books.map(book => (<Books
              {...this.props}
                key={book.Book.id}
                book={book.Book}
                userId={this.props.userId}
                borrowBook={this.props.borrowBook}
                returnBook={this.props.returnBook}
                borrowedBook={this.props.borrowed}
          />)) : this.state.isProperties ? <div className="contents">
            You have not borrowed any book at this point in time</div> : ''}
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

const mapStateToProps = state => ({
  getAllBorrowedBooks: state.getAllBorrowed,
  loading: state.getAllBorrowed.isLoading,
});
export default connect(mapStateToProps, { getAllBorrowed })(allBorrowed);
