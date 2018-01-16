import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification.jsx';
import { getNotification } from '../actions/notification';

/**
 * @class Notifications
 * @classdesc returns Notificarions component
 */
export class Notifications extends Component {
  /**
   * @returns {undefined}
   */
  componentWillMount() {
    const { id, star } = this.props.auth.user;
    this.props.getNotification(
      star,
      id
    );
  }
  /**
   * @return {XML} JSX
   */
  render() {
    const { notifications } = this.props;
    const mdlTableClass = `
    mdl-data-table
    mdl-js-data-table
    mdl-shadow--2dp
    `;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="ask">
            <h5>Notifications</h5>
          </div>
          {notifications && notifications.length > 0 ?
          <table className="table-bordered">
            {notifications.map((notification, index) => (<SingleNotification
              key={index}
              notification={notification}
              userId={this.props.auth.user.user}
              isAdmin={this.props.auth.user.isAdmin}
            />))}
          </table>
          :
          <div className="contents">
            <h5>You have no notification at this point in time</h5>
          </div>
          }
        </div>
      </div>
    );
  }
}
/**
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  notifications: state.getNotification.notifications,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getNotification,
})(Notifications);
