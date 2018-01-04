import axios from 'axios';

import url from '../utils/url';
import types from '../types/types';

const {
  GET_PDF,
  GET_PDF_SUCCESSFUL,
  FAILED_TO_GET_PDF
} = types;
/**
 * @param {number} id
 * @return {void}
 */
const getPdf = id => (dispatch) => {
  dispatch({ type: GET_PDF });
  return axios.get(`${url}/books/${id}`)
    .then((response) => {
      if (response) {
        return dispatch({
          type: GET_PDF_SUCCESSFUL,
          payload: response.data,
        });
      }
      return null;
    }).catch((error) => {
      if (error) {
        return dispatch({
          type: FAILED_TO_GET_PDF,
          payload: error.response.data,
        });
      }
      return null;
    });
};
export default getPdf;
