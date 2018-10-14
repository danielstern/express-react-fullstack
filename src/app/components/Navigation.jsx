import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Navigation = ({id})=>(
    <div className="header">
        <h1>
            Welcome, <ConnectedUsernameDisplay id={id}/>!
        </h1>
        <ul>
            <Link to="/">
                <li>Home</li>
            </Link>
        </ul>
    </div>
);

const mapStateToProps = (state)=>({
    id:state.session.id,
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

