const getUserState = {
  fetching: false,
  user: {},
  errors: '',
};
const getUser = (state = getUserState, action = {}) => {
  switch (action.type) {
    case 'GET_USER': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'GET_USER_SUCCESSFUL': {
      return {
        ...state,
        fetching: false,
        user: action.payload,
      };
    }
    case 'GET_USER_FAILED': {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
export default getUser;
