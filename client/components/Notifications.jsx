import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification.jsx';
import { getNotification } from '../actions/notification';
import { getAllBorrowed } from '../actions/history';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrows: [],
    };
  }
  componentWillMount() {
    const { id, star } = this.props.auth.user;
    this.props.getNotification(
      star,
      id
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.borrowedBooks) {
      this.setState({
        borrows: nextProps.borrowedBooks,
      });
    }
  }
  render() {
    const { notifications } = this.props;
    const mdlTableClass = `
    mdl-data-table
    mdl-js-data-table
    mdl-shadow--2dp
    notifications
    `;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <table className={mdlTableClass}>
            {notifications.map(notification => (<SingleNotification
              key={notification.id}
              notification={notification}
              userId={this.props.auth.user.user}
              isAdmin={this.props.auth.user.isAdmin}
            />))
            }
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  notifications: state.getNotification.notifications,
  auth: state.auth,
  borrowedBooks: state.getAllBorrowed.borrowedBooks,
});
export default connect(mapStateToProps, {
  getNotification,
  getAllBorrowed,
})(Notifications);
