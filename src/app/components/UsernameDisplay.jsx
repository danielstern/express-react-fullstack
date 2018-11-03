import React from 'react';
import { connect } from 'react-redux';

export const UsernameDisplay = ({name})=>(

    <span>{name}</span>
);

const mapStateToProps = (state,ownProps)=>{
    return state.users.find(user=>user.id===ownProps.id)
};

export const ConnectedUsernameDisplay = connect(mapStateToProps)(UsernameDisplay);