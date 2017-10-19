import { browserHistory } from 'react-router';

export const notifications = () => {
    return dispatch => browserHistory.push('/notifications')
}
export const adminHome = () => {
    return dispatch => browserHistory.push('/admin_home')
}
export const requests = () => {
    return dispatch => browserHistory.push('/requests')
}
export const log = () => {
    return dispatch => browserHistory.push('/log')
}
export const allBooks = () => {
    return dispatch => browserHistory.push('/home')
}
export const home = () => {
    return dispatch => browserHistory.push('/home')
}
export const history = () => {
    return dispatch => browserHistory.push('/history')
}
export const settings = () => {
    return dispatch => browserHistory.push('/settings')
}
