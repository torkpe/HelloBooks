import React, { Component } from 'react';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';

import {getBooks} from '../actions/books';
import Books from './Books';

class Home extends Component {
  componentWillMount(){
    this.props.getBooks()
  }
  render() {
    return (
      <div>
        <Books />
      </div>
    );
  }
}
Home.propTypes = {
    getBooks: propTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}
export default connect(mapStateToProps, { getBooks })(Home);
