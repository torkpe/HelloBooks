import React, { Component } from 'react';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';

import {getBooks} from '../actions/books';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>hello Admin</h1>
      </div>
    );
  }
}
export default Home;
