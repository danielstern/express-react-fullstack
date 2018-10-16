import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Navigation = ({id})=>(
    <div className="header">
        <Link to="/">
            <h1>
                Daily Organizer
            </h1>
        </Link>
        <h4>
            Welcome, <ConnectedUsernameDisplay id={id}/>!
        </h4>
        {/*<Link to="/">*/}
            {/*<span>Home</span>*/}
        {/*</Link>*/}
        {/*<ul>
            <Link to="/">
                <li>Home</li>
            </Link>
        </ul>*/}
    </div>
);

const mapStateToProps = (state)=>({
    id:state.session.id,
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

