import { browserHistory } from 'react-router';

// Route for components
export const notifications = () => dispatch => browserHistory.push('/notifications');
export const uploadBook = () => dispatch => browserHistory.push('/upload-book');
export const allBooks = () => dispatch => browserHistory.push('/home');
export const home = () => dispatch => browserHistory.push('/home');
export const history = () => dispatch => browserHistory.push('/history');
export const settings = () => dispatch => browserHistory.push('/settings');
