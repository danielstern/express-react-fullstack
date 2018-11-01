import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay'

const Navigation = ({id, authenticated})=>(
    <div className="header">
        { authenticated ?
            <Link to="/dashboard">
                <h1>
                    Daily Organizer
                </h1>
            </Link> :
            <h1>
                Daily Organizer
            </h1>
        }

        { authenticated ?
            <h4>
                Welcome, <ConnectedUsernameDisplay id={id}/>!
            </h4>
            : null
        }
    </div>
);

const mapStateToProps = (state)=>({
    id:state.session.id,
    authenticated:state.session.authenticated == `AUTHENTICATED`
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

