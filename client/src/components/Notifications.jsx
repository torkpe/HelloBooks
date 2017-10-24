import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification';
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
    this.props.getNotification(this.props.auth.user.star, this.props.auth.user.user);
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
      <div className="mdl-grid ">
        <div className="mdl-cell mdl-cell--1-col" />
        <div className="mdl-cell mdl-cell--10-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
          <div className="contents" />
          <div className="ask">{this.props.loading ? 'Loading...' : ''}</div>
          <div className="mdl-grid contents">
            {notifications.map(notification => (<SingleNotification
                key={notification.id}
                notification={notification}
                payBack={this.props.payBack}
                userId={this.props.auth.user.user}
                category={this.props.auth.user.category}
            />))
            }
          </div>
          <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--2-col" />
          </div>
        </div>
        <div className="mdl-cell mdl-cell--1-col" />
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
