import React, { Component } from 'react';
import { connect } from 'react-redux';

import { exceedDeadlines, clearBooks } from '../actions/books';
import Books from './Books.jsx';
import { notify } from '../actions/notification';
import { chargeUser } from '../actions/charges';

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
          <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="mdl-grid">
            {books.map(book => (<Books
              {...this.props}
              key={book.id}
              book={book.Book}
              charge={this.props.chargeUser}
              borrowedUserId={book.userId}
              successfullyCharged={successfullyCharged}
              notify={this.props.notify}
              isAdmin={this.props.isAdmin}
            />))}
            {books.length < 1 ? <div className="ask"> There are no books in the log at this point in time </div> : ''}
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
  exceedDeadline: state.getExceeds,
  charge: state.charge,
});
export default connect(mapStateToProps, {
  exceedDeadlines,
  chargeUser,
  notify,
  clearBooks,
})(Log);
