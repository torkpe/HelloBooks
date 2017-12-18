import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getNotification } from '../actions/notification';

/**
 * @param {object} props
 * @return {XML} JSX
 */
const SingleNotification = (props) => {
  const { notification, userId } = props;
  const mdlLink = `
  mdl-button
  mdl-button--colored
  mdl-js-button
  mdl-js-ripple-effect notifyButton
  `;
  return (
    <tbody>
      <tr>
        <td className="notifications">
          {notification.message}
          {notification.bookId ?
            <span className="notifyLink">
              <Link
              to={`/single/${notification.bookId}`}
              >
                  View Book
              </Link>
            </span>
          : ''}
        </td>
      </tr>
    </tbody>
  );
};
export default SingleNotification;
