import { combineReducers } from 'redux';

import auth from './auth';
import signin from './signin';
import signup from './signup';

const rootReducer = combineReducers({
    auth,
    signin,
    signup
});

export default rootReducer;
