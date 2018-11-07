import { ConnectedTaskList } from './TaskList';
import { connect } from 'react-redux';
import React from 'react';
import { history } from '../components/Main'

const Dashboard = ({groups})=>(
    <div className="row">
        {groups.map(group=>(
            <ConnectedTaskList key={group.id} {...group} className="col"/>
        ))}
    </div>
);

// If statement here acts as a route guard...
// Is it a good practice to have route guarding logic in MSTP? Probably not...
// TODO ... put guard in more logical place
const mapStateToProps = ({groups})=>{
    if (groups.length == 0) {
        history.push(`/`)
    }

    return {
        groups
    }
};

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
