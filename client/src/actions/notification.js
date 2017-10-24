import axios from 'axios';

export const notify = data => (dispatch) => {
  dispatch({ type: 'POST_NOTIFICATION' });
  axios.post('https://hellobooks-project.herokuapp.com/api/notifications', data)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'POST_NOTIFICATION_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((err) => {
      if (err) {
        return dispatch({
          type: 'FAILED_TO_POST_NOTIFICATION',
          payload: err,
        });
      }
      return null;
    });
};
export const getNotification = (category, id) => {
  const determineCategory = () => {
    if (category === 'admin') {
      return axios.get('https://hellobooks-project.herokuapp.com/api/notifications/admin');
    }
    return axios.get(`https://hellobooks-project.herokuapp.com/api/notifications/user/${id}`);
  };
  return (dispatch) => {
    dispatch({ type: 'GET_NOTIFICATION' });
    determineCategory(category)
      .then((response) => {
        if (response.data) {
          return dispatch({
            type: 'GET_NOTIFICATION_SUCCESSFUL',
            payload: response.data,
          });
        }
        return null;
      }).catch((err) => {
        if (err) {
          return dispatch({
            type: 'FAILED_TO_GET_NOTIFICATION',
            payload: err,
          });
        }
        return null;
      });
  };
};