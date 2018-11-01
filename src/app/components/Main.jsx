import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history'

import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedNavigation } from './Navigation'
import { ConnectedLogin } from './Login'
import { store } from '../store';

export const history = createBrowserHistory();


export const Main = ()=>(
    <Router history={history}>
        <Provider store={store}>
            <div className="container mt-3">
                <ConnectedNavigation/>
                <Route exact path="/" component={ConnectedLogin} />
                <Route exact path="/dashboard" component={ConnectedDashboard} />
                <Route exact path="/task/:id" component={ConnectedTaskDetail}/>
            </div>
        </Provider>
    </Router>
);