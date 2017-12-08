import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getNotification } from '../actions/notification';

const SingleNotification = (props) => {
  const { notification, userId } = props;
  return (
    <tbody>
      <tr>
        <td className="mdl-data-table__cell--non-numeric notifications">
          {notification.message}
          {notification.bookId ?
            <Link to={`/single/${notification.bookId}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect notifyButton">
                View Book
            </Link>
          : ''}
        </td>
      </tr>
    </tbody>
  );
}
export default SingleNotification;
