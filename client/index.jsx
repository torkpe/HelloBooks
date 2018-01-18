import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
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
import uploadBook from './components/UploadBook.jsx';
import Restrict from './components/Restrict.jsx';
import Settings from './components/Settings.jsx';
import AllBorrowed from './components/AllBorrowed.jsx';
import AllNotReturned from './components/AllNotReturned.jsx';
import notification from './components/Notifications.jsx';
import SingleBook from './components/SingleBook.jsx';
import Pdf from './components/Pdf.jsx';
import SetPassword from './components/ChangePassword.jsx';
import UpdateBook from './components/UpdateBook.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import configureStore from './store/store';

/**
 * configure store
 */
const store = configureStore();

if (localStorage.jwt) {
  setAuth(localStorage.jwt);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwt)));
}

const router = (
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={isAlreadySignedin(Landing)} />
          <Route path="/signup" component={isAlreadySignedin(Signup)} />
          <Route path="/signin" component={isAlreadySignedin(Signin)} />
          <Route path="/redirect" component={isAlreadySignedin(Redirect)} />
          <Route path="/confirmation/:key" component={isAlreadySignedin(Confirm)} />
          <Route path="/home" component={Authenticate(Home)} />
          <Route path="/upload-book" component={Authenticate(isAdmin(uploadBook))} />
          <Route path="/book/:id" component={Authenticate(SingleBook)} />
          <Route path="/settings" component={Authenticate(isUser(Settings))} />
          <Route path="/all-borrowed-books" component={Authenticate(isUser(AllBorrowed))} />
          <Route path="/history" component={Authenticate(isUser(AllNotReturned))} />
          <Route path="/notifications" component={Authenticate(notification)} />
          <Route path="/single/:id" component={Authenticate(SingleBook)} />
          <Route path="/read-book/:key" component={Authenticate((Pdf))} />
          <Route path="/restrict" component={Authenticate((Restrict))} />
          <Route path="/set-password" component={Authenticate((SetPassword))} />
          <Route path="/edit-book/:id" component={Authenticate((UpdateBook))} />
          <Route path="/forgot-password" component={isAlreadySignedin(ForgotPassword)} />
          <Route path="/reset-password/:key" component={isAlreadySignedin(ResetPassword)} />
        </Route>
      </Router>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        preventOpenDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
    </div>
  </Provider>
);
ReactDOM.render(router, document.getElementById('root'));
