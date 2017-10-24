import { browserHistory } from 'react-router';

export const notifications = () => dispatch => browserHistory.push('/notifications');
export const adminHome = () => dispatch => browserHistory.push('/admin_home');
export const requests = () => dispatch => browserHistory.push('/requests');
export const log = () => dispatch => browserHistory.push('/log');
export const allBooks = () => dispatch => browserHistory.push('/home');
export const home = () => dispatch => browserHistory.push('/home');
export const history = () => dispatch => browserHistory.push('/history');
export const settings = () => dispatch => browserHistory.push('/settings');
