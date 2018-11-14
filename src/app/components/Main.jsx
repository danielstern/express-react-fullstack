import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedNavigation } from './Navigation'
import { ConnectedLogin } from './Login'
import { store } from '../store';
import { history } from '../store/history';
import { Redirect } from 'react-router';
import { NOT_AUTHENTICATED } from '../store/mutations'

// export function routeGuard(state,component){
//     console.log("State?",state,state.groups);
//     if (state.groups.length == 0) {
//         console.log("Redirecting");
//         history.push(`/`)
//     } else {
//         console.log("Returning...",ConnectedTaskDetail);
//         return ConnectedTaskDetail;
//     }
//     //return groups.length;
//
// };

// const bla = (bla)=>{
//     console.log("BLA",bla);
// }

const RouteGuard = Component =>({match})=>!store.getState().session.authenticated ?
    <Redirect to="/"/> :
    <Component match={match}/>;

export const Main = ()=>(
    <Router history={history}>
        <Provider store={store}>
            <div className="container mt-3">
                <ConnectedNavigation/>
                <Route exact path="/" component={ConnectedLogin} />
                <Route exact
                       path="/dashboard"
                       render={RouteGuard(ConnectedDashboard)}/>

                <Route exact
                       path="/task/:id"
                       render={RouteGuard(ConnectedTaskDetail)} />

                {/*<Route exact*/}
                {/*path="/task/:id"*/}
                {/*render={()=><ConnectedTaskDetail} />*/}

            </div>
        </Provider>
    </Router>
);