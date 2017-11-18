import React, { Component } from 'react';
import { Link } from 'react-router';

class Table extends Component {
  render() {
    const { book } = this.props;
    const chargeUser = (e) => {
      this.props.charge(this.props.userId, this.props.bookId);
    };
    return (
      <tbody>
        <tr>
          <td className="mdl-data-table__cell--non-numeric">{book.title}</td>
          <td>{new Date(this.props.borrowedDate).toLocaleString()}</td>
          <td>{new Date(this.props.returnDate).toLocaleString()}</td>
          <td><Link to={`/book/${this.props.bookId}`}>View Book</Link></td>
          <td><button onClick={chargeUser}>Charge</button></td>
        </tr>
      </tbody>
    );
  }
}
export default Table;
