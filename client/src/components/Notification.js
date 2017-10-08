import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getNotification } from '../actions/notification';

class SingleNotification extends Component {
  render() {
      const notification = this.props.notification
      const payBack = (e) => {
          this.props.payBack(this.props.userId, notification.bookId)
      }
    return (
        <div className='notifications'>
            {   
              notification.message
            }
            <a onClick={payBack}className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect notifyButton">
            Pay back
            </a>
            < Link to={`/single/${notification.bookId}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect notifyButton">
                View Detail
            </Link>
            <hr />
        </div>
              
    );
  }
}
export default SingleNotification;
