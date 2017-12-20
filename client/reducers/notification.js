import types from '../types/types';

const {
  GET_NOTIFICATION,
  GET_NOTIFICATION_SUCCESSFUL,
  FAILED_TO_GET_NOTIFICATION
} = types;

const notifyState = {
  isLoading: false,
  errors: {},
  notification: {},
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */

const notificationState = {
  isLoading: false,
  errors: {},
  notifications: [],
};
/**
 * @param {object} state
 * @param {object} action
 * @return {object} state
 */
export const getNotification = (state = notificationState, action = {}) => {
  switch (action.type) {
    case GET_NOTIFICATION: {
      return {
        ...state,
        fetching: true,
      };
    }
    case GET_NOTIFICATION_SUCCESSFUL: {
      return {
        ...state,
        fetching: false,
        notifications: action.payload,
      };
    }
    case FAILED_TO_GET_NOTIFICATION: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};