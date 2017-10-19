import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleNotification from './Notification'
import { getNotification } from '../actions/notification';
import { payBack } from '../actions/payback';
import { getAllBorrowed } from '../actions/history';

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state ={
            borrows: []
        }
    }
    componentWillMount(){
        this.props.getNotification(this.props.auth.user.star, this.props.auth.user.user)
        this.props.getAllBorrowed(this.props.auth.user.user)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.borrowedBooks) {
            this.setState({
                borrows: nextProps.borrowedBooks
            })          
            console.log(nextProps.borrowedBooks)
        }
    }
    upgrade() {
        console.log('you just upgraded')
    }
  render() {
      const notifications = this.props.notification
    return (
        <div className='mdl-grid '>
        <div className="mdl-cell mdl-cell--1-col"></div>
        <div className="mdl-cell mdl-cell--10-col">
          <div className='mdl-grid'>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
          <div className='contents'>
          </div>
          <div className='ask'>{this.props.loading ? 'Loading...' : ''}</div>
          <div className='mdl-grid contents'>
            {this.state.borrows.length === 1 ? <a onClick = {this.upgrade} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect notifyButton">Upgrade</a>:
            this.state.borrows.length === 2 ? 'ho  hoh': 
            this.state.borrows.length === 3 ? 'hahahahahaha'
            : 'not working'
            }
            {/* {this.state.borrows.length === 2 ? 'ho  hoh': ''}
            {this.state.borrows.length === 3 ? 'hahahahahaha' : ''} */}
            {notifications.map(notification => <SingleNotification
                key={notification.id}
                notification={notification}
                payBack={this.props.payBack}
                userId={this.props.auth.user.user}
                category ={this.props.auth.user.category}
            />)
            }
          </div>
          <div className='mdl-grid '>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--1-col"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        notification: state.getNotification.notifications,
        auth: state.auth,
        borrowedBooks: state.getAllBorrowed.borrowedBooks
    }
}
export default connect(mapStateToProps,{ getNotification, payBack, getAllBorrowed })(Notifications);
