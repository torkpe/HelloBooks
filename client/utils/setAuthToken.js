import axios from 'axios';

/**
 * @param {object} token
 * @return {undefined}
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
export default setAuthToken;
