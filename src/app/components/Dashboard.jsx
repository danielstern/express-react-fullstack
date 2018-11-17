/**
 * The dashboard is a simple React component that contains several lists of tasks,
 * one for each group that belongs to the user.
 */

import { connect } from 'react-redux';
import React from 'react';
import { ConnectedTaskList } from './TaskList';

const Dashboard = ({groups})=>(
    <div className="row">
        {groups.map(group=>(
            <ConnectedTaskList key={group.id} {...group} className="col"/>
        ))}
    </div>
);

const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
