import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import Main from './components/Main';
import Landing from './components/Landing';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Redirect from './components/Redirect';
import Confirm from './components/Confirm';

const store = createStore(
    (state = {}) => state, applyMiddleware(thunk)
);
const router =(
    <Provider store= {store}>
        <Router history = {browserHistory}>
            <Route path = '/' component={Main}>
                <IndexRoute component={Landing}></IndexRoute>
                <Route path='/signup' component={Signup}></Route>
                <Route path='/signin' component={Signin}></Route>
                <Route path= '/redirect' component={Redirect}></Route>
                <Route path= '/confirmation/:key' component={Confirm}></Route>
            </Route>
        </Router>
    </Provider>
)
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
