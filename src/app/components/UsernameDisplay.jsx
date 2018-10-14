import React from 'react';
import { connect } from 'react-redux';

export const UsernameDisplay = ({name})=>(
    <span>{name}</span>
);

const mapStateToProps = (state,ownProps)=>{
    let user = state.users.find(user=>user.id===ownProps.id);
    if (!user){
        // here, the user data must be requested, but how can we do so?
    } else {
        return {...user};
    }
};

export const ConnectedUsernameDisplay = connect(mapStateToProps)(UsernameDisplay);