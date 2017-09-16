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
import { Authenticate, isAlreadySignedin } from './utils/requireAuth';

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
                <Route path= '/home' component={Authenticate(Home)}></Route>
            </Route>
        </Router>
    </Provider>
)
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
