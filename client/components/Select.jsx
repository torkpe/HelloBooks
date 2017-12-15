import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHistory } from '../actions/history';

/**
 * @class ResetPassword
 * @classdesc returns Select component
 */
class Select extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      view: '',
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onChange(event) {
    this.props.getHistory(event.target.value);
  }
  /**
   * @return {XML} JSX
   */
  render() {
    return (
      <select name="view" onChange={this.onChange}>
        <option value="" disabled selected hidden>View By</option>
        <option value="all" >All Borrowed Books</option>
      </select>
    );
  }
}

export default connect(null, { getHistory })(Select);
