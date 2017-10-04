import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNotification } from '../actions/notification';

class Notifications extends Component {
    componentWillMount(){
        this.props.getNotification(this.props.auth.user.star)
    }
  render() {
      const notifications = this.props.notification.notifications
    return (
        <div className='mdl-grid'>                                               
            <div className='contents'>
                <div className="card-enlarge mdl-card mdl-shadow--3dp">                   
                    {notifications.map(notification => notification.message, <hr/>)
                    }
                </div>
            </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        notification: state.getNotification,
        auth: state.auth
    }
}
export default connect(mapStateToProps,{ getNotification })(Notifications);
