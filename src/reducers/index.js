import { combineReducers } from 'redux';

import auth from './auth';
import signin from './signin';
import signup from './signup';
import book from './book';

const rootReducer = combineReducers({
    auth,
    signin,
    signup,
    book
});

export default rootReducer;
