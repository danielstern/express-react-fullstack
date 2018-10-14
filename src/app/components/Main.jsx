import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedNavigation } from './Navigation'
import { store } from '../store';



export const Main = ()=>(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <ConnectedNavigation/>
                <Route exact path="/" component={ConnectedDashboard} onChange={()=>console.log("You hit this route up")}/>
                <Route exact path="/task/:id" component={ConnectedTaskDetail}/>
            </div>
        </Provider>
    </BrowserRouter>
);