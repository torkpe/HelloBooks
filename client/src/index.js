import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';

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
import Profile from './components/Profile';
import userHistory from './components/userHistory';
import allBorrowed from './components/allBorrowed';
import allNotReturned from './components/allNotReturned';
import notification from './components/Notifications';
import SingleBook from './components/SingleBook';
import Log from './components/Log';
import Pdf from './components/Pdf';
import setPassword from './components/changePassword';
import updateBook from './components/bookForm';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

if (localStorage.jwt) {
  setAuth(localStorage.jwt);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwt)));
}

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={isAlreadySignedin(Landing)} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/redirect" component={Redirect} />
        <Route path="/confirmation/:key" component={Confirm} />
        <Route path="/home" component={Authenticate(Home)} />
        <Route path="/admin_signin" component={adminSignin} />
        <Route path="/admin_signup" component={adminSignup} />
        <Route path="/admin_home" component={Authenticate(isAdmin(adminHome))} />
        <Route path="/book/:id" component={Authenticate(SingleBook)} />
        <Route path="/settings" component={Authenticate(isUser(Profile))} />
        <Route path="/all_borrowed_books" component={Authenticate(isUser(allBorrowed))} />
        <Route path="/history" component={Authenticate(isUser(allNotReturned))} />
        <Route path="/notifications" component={Authenticate(notification)} />
        <Route path="/single/:id" component={Authenticate(SingleBook)} />
        <Route path="/read-book/:key" component={Authenticate((Pdf))} />
        <Route path="/log" component={Authenticate(Log)} />
        <Route path="/restrict/:key" component={Authenticate((Restrict))} />
        <Route path="/set-password" component={Authenticate((setPassword))} />
        <Route path="/edit-book/:id" component={Authenticate((updateBook))} />
      </Route>
    </Router>
  </Provider>
);
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
