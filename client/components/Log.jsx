import React, { Component } from 'react';
import { connect } from 'react-redux';

import { exceedDeadlines, clearBooks } from '../actions/books';
import Books from './Books.jsx';
import { notify } from '../actions/notification';
import chargeUser from '../actions/charges';
import Table from './LogTable.jsx';

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExceedDeadlinesReceived: false,
    };
  }
  componentDidMount() {
    this.props.exceedDeadlines();
  }
  componentWillUnmount() {
    this.props.clearBooks();
  }
  render() {
    const books = this.props.exceedDeadline.exceeds;

    const { successfullyCharged } = this.props.charge;
    return (
      <div className="mdl-grid ">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid">
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Book Title</th>
                  <th>Borrowed Date</th>
                  <th>Return Date</th>
                  <th>View Book</th>
                  <th>Action</th>
                </tr>
              </thead>
              {books.map(book => console.log(book)(<Table
              {...this.props}
              key={book.id}
              book={book.Book}
              userId={book.userId}
              bookId={book.bookId}
              returnDate={book.returnDate}
              borrowedDate={book.createdAt}
              charge={this.props.chargeUser}
            />))}
            </table>
            {books.length < 1 ? <div className="ask"> There are no books in the log at this point in time </div> : ''}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--1-col" />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  exceedDeadline: state.getExceeds,
  charge: state.charge,
});
export default connect(mapStateToProps, {
  exceedDeadlines,
  chargeUser,
  notify,
  clearBooks,
})(Log);
