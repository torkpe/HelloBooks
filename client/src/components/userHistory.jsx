import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from './Select';

class userHistory extends Component {
  render() {
    return (
      <div className="mdl-grid ">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="ask">
            <Select />
          </div>
          <div className="mdl-grid" />
          <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
        </div>
        <div className="mdl-cell mdl-cell--1-col" />
      </div>
    );
  }
}

export default connect(null)(userHistory);
