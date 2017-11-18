import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification.jsx';
import { getNotification } from '../actions/notification';
import payBack from '../actions/payback';
import { getAllBorrowed } from '../actions/history';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borrows: [],
    };
  }
  componentWillMount() {
    const { user, star } = this.props.auth.user;
    this.props.getNotification(
      star,
      user
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
    return (
      <div className="mdl-grid">
        <div className="contents">
          <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp notifications">
            {notifications.map(notification => (<SingleNotification
              key={notification.id}
              notification={notification}
              payBack={this.props.payBack}
              userId={this.props.auth.user.user}
              category={this.props.auth.user.category}
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
  payBack,
  getAllBorrowed,
})(Notifications);
