import { ConnectedTaskList } from './TaskList';
import { connect } from 'react-redux';
import React from 'react';

const Dashboard = ({groups})=>(
    <div className="row">
        {groups.map(group=>(
            <ConnectedTaskList key={group.id} {...group} className="col"/>
        ))}
    </div>
)

export const ConnectedDashboard = connect(state=>({
    groups:state.groups
}))(Dashboard);
