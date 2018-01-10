import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification.jsx';
import { getNotification } from '../actions/notification';
import { getAllBorrowed } from '../actions/history';

/**
 * @class Notifications
 * @classdesc returns Notificarions component
 */
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrows: [],
    };
  }
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
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.borrowedBooks) {
      this.setState({
        borrows: nextProps.borrowedBooks,
      });
    }
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
              {notifications.map(notification => (<SingleNotification
                key={notification.id}
                notification={notification}
                userId={this.props.auth.user.user}
                isAdmin={this.props.auth.user.isAdmin}
              />))}
            </table>
          : <div className="contents">
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
  borrowedBooks: state.getAllBorrowed.borrowedBooks,
});
export default connect(mapStateToProps, {
  getNotification,
  getAllBorrowed,
})(Notifications);
