import React, { Component } from 'react';
import { connect } from 'react-redux';

import { exceedDeadlines } from '../actions/books';
import Books from './Books';
import { chargeUser } from '../actions/charges'
class Log extends Component {
  componentWillMount(){
    this.props.exceedDeadlines()
  }
  render() {
    const books = this.props.exceedDeadline.exceeds
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
              book={book.Book}
              charge= {this.props.chargeUser}
              userId={book.userId}
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
const mapStateToProps = (state) => {
  return {
    exceedDeadline: state.getExceeds
  }
}
export default connect(mapStateToProps, {  exceedDeadlines, chargeUser })(Log);
