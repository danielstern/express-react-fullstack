import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history'


import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedNavigation } from './Navigation'
import { store } from '../store';

const history = createBrowserHistory();


export const Main = ()=>(
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation/>
                <Route exact path="/" component={ConnectedDashboard} onChange={()=>console.log("You hit this route up")}/>
                <Route exact path="/task/:id" component={ConnectedTaskDetail}/>
            </div>
        </Provider>
    </Router>
);