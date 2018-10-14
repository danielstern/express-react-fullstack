import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({name})=>(
    <div className="header">
        <h1>
            Welcome, {name}!
        </h1>
        <ul>
            <Link to="/">
                <li>Home</li>
            </Link>
        </ul>
    </div>
)

export const ConnectedNavigation = connect(state=>({
    name:state.users.find(user=>user.id === state.session.id).name
}))(Navigation);

