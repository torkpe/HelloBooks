import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getAllBorrowed} from '../actions/history';
import Select from './Select';

class allBorrowed extends Component {
  componentWillMount(){
      this.props.getAllBorrowed(this.props.auth.user.user)
  }
  render() {
    return (
      <div className='mdl-grid '>
        <div className="mdl-cell mdl-cell--1-col"></div>
        <div className="mdl-cell mdl-cell--10-col">
          <div className='mdl-grid '>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
          <div className='ask'>
            All Borrowed Books <hr/>
            
          </div>
          <div className='mdl-grid'>
            
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
const mapStateToProps =(state) => {
  return{
    allborrowed: state.getAllBorrowed.borrowedBooks
  }
}
export default connect(mapStateToProps, {getAllBorrowed})(allBorrowed);
