import axios from 'axios';

import url from '../utils/url';

const chargeUser = (userId, bookId) => (dispatch) => {
  dispatch({
    type: 'CHARGE_USER'
  });
  return axios.put(`${url}/admins/charge-user/${userId}/${bookId}`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: 'SUCCESSFULLY_CHARGED_USER',
          payload: response.data
        });
      }
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: 'CHARGE_USER_FAILED',
          payload: error.response.data
        });
      }
    });
};
export default chargeUser;
