import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getHistory } from '../actions/history';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: '',
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
      this.props.getHistory(e.target.value)
    }
  render() {
    return (
        <select name='view' onChange={this.onChange}>
            <option value="" disabled selected hidden>View By</option>
            <option value="all" >All Borrowed Books</option>
        </select>        
    );
  }
}

export default connect(null, {getHistory})(Select);
