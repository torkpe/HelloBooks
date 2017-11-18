import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getNotification } from '../actions/notification';

class SingleNotification extends Component {
  render() {
    const notification = this.props.notification;
    const payBack = (e) => {
      this.props.payBack(this.props.userId, notification.bookId);
    };
    return (
      <tbody>
        <tr>
          <td className="mdl-data-table__cell--non-numeric notifications">
            {notification.message} {this.props.category ? '' :
            <button
        onClick={payBack}
        className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect ">
            Pay back
            </button>
            }
            <Link to={`/single/${notification.bookId}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect notifyButton">
                View Book
            </Link>
          </td>
        </tr>
      </tbody>
    );
  }
}
export default SingleNotification;
