import axios from 'axios';

import url from '../utils/url';

const payBack = (userId, bookId) => (dispatch) => {
  dispatch({ type: 'PAY_BACK' });
  return axios.put(`${url}/users/${userId}/${bookId}/book/payback`)
    .then((response) => {
      if (response.data) {
        return dispatch({
          type: 'PAY_BACK_SUCCESSFUL',
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'PAY_BACK_FAILED',
          payload: error.response.data,
        });
      }
      return null;
    });
};
export default payBack;
