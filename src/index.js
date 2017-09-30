import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from'jsonwebtoken';

import registerServiceWorker from './registerServiceWorker';
import Main from './components/Main';
import Landing from './components/Landing';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Redirect from './components/Redirect';
import Confirm from './components/Confirm';
import Home from './components/Home';
import setAuth from './utils/setAuthToken';
import rootReducer from './reducers/index';
import { setCurrentUser } from './actions/index';
import { Authenticate, isAlreadySignedin, isUser, isAdmin } from './utils/requireAuth';
import adminSignin from './components/adminSignin';
import adminSignup from './components/adminSignup';
import adminHome from './components/adminHome';
import Restrict from './components/Restrict';
import book from './components/SingleBook';
import Profile from './components/Profile';
import Password from './components/Password';
import userHistory from './components/userHistory';
import allBorrowed from './components/allBorrowed';
import allNotReturned from './components/allNotReturned';



const store =createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwt) {
    setAuth(localStorage.jwt)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwt)));
}

const router =(
    <Provider store= {store}>
        <Router history = {browserHistory}>
            <Route path = '/' component={Main}>
                <IndexRoute component={isAlreadySignedin(Landing)}></IndexRoute>
                <Route path='/signup' component={Signup}></Route>
                <Route path='/signin' component={Signin}></Route>
                <Route path= '/redirect' component={Redirect}></Route>
                <Route path= '/confirmation/:key' component={Confirm}></Route>
                <Route path= '/home' component={Authenticate(isUser(Home))}></Route>
                <Route path= '/admin_signin' component={adminSignin}></Route>
                <Route path= '/admin_signup' component={adminSignup}></Route>
                <Route path= '/admin_home' component={Authenticate(isAdmin(adminHome))}></Route>
                <Route path= '/book/:id' component={Authenticate(book)} />
                <Route path= '/change_password' component={Authenticate(isUser(Password))} />
                <Route path= '/settings' component={Authenticate(isUser(Profile))} />
                <Route path= '/all_borrowed_books' component={Authenticate(isUser(allBorrowed))} />
                <Route path= '/history' component={Authenticate(isUser(allNotReturned))} />
                <Route path= '/restrict/:key' component={Authenticate((Restrict))}></Route>
            </Route>
        </Router>
    </Provider>
)
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
