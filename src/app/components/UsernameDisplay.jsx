import React from 'react';
import { connect } from 'react-redux';

console.log("TEST");
export const UsernameDisplay = ({name})=>(

    <span>{name}</span>
);

const mapStateToProps = (state,ownProps)=>{
    console.log(state.users,ownProps);
    return state.users.find(user=>user.id===ownProps.id)
};
// const mapStateToProps = (state,ownProps)=>{console.log(state,ownProps); return state.users.find(user=>user.id===ownProps.id)};

export const ConnectedUsernameDisplay = connect(mapStateToProps)(UsernameDisplay);