import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification'
import { getNotification } from '../actions/notification';
import { payBack } from '../actions/payback';

class Notifications extends Component {
    componentWillMount(){
        this.props.getNotification(this.props.auth.user.star, this.props.auth.user.user)
    }
  render() {
      const notifications = this.props.notification
    return (
        <div className='mdl-grid'>                                               
            <div className='contents'>
                <div className="card-enlarge mdl-card mdl-shadow--3dp">
                {notifications.map(notification => <SingleNotification 
                        key={notification.id}
                        notification={notification}
                        payBack={this.props.payBack}
                        userId={this.props.auth.user.user}
                    />)
                    }
                </div>
            </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        notification: state.getNotification.notifications,
        auth: state.auth
    }
}
export default connect(mapStateToProps,{ getNotification, payBack })(Notifications);
