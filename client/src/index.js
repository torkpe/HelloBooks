import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';

import Main from './components/Main.jsx';
import Landing from './components/Landing.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Redirect from './components/Redirect.jsx';
import Confirm from './components/Confirm.jsx';
import Home from './components/Home.jsx';
import setAuth from './utils/setAuthToken';
import rootReducer from './reducers/index';
import { setCurrentUser } from './actions/user';
import { Authenticate, isAlreadySignedin, isUser, isAdmin } from './utils/requireAuth.jsx';
import adminSignin from './components/adminSignin.jsx';
import adminSignup from './components/adminSignup.jsx';
import adminHome from './components/adminHome.jsx';
import Restrict from './components/Restrict.jsx';
import Profile from './components/Profile.jsx';
import userHistory from './components/userHistory.jsx';
import allBorrowed from './components/allBorrowed.jsx';
import allNotReturned from './components/allNotReturned.jsx';
import notification from './components/Notifications.jsx';
import SingleBook from './components/SingleBook.jsx';
import Log from './components/Log.jsx';
import Pdf from './components/Pdf.jsx';
import setPassword from './components/changePassword.jsx';
import updateBook from './components/bookForm.jsx';

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
        <Route path="/signup" component={isAlreadySignedin(Signup)} />
        <Route path="/signin" component={isAlreadySignedin(Signin)} />
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
