import isEmpty from 'lodash/isEmpty';

import types from '../types/types';

const {
  SET_CURRENT_USER
} = types;

const initialState = {
  isAuthenticated: false,
  user: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
const userAuth = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user), // should set isAuthenticated to true or false
        user: action.user,
      };
    default: return state;
  }
};
export default userAuth;
