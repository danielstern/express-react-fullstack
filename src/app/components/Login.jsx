import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';

const LoginComponent = ({authenticateUser,authenticated})=>(
    <div className="card p-3 col-6">
        <h2>
            Please login
        </h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Alexander" className="form-control"/>
            <input type="text" placeholder="password" name="password" defaultValue="greatness" className="form-control mt-2"/>
            <button type="submit" disabled={authenticated === `PROCESSING`} className="form-control mt-2 btn btn-primary">
                Login
            </button>
        </form>
    </div>
);

const mapStateToProps = (state)=>({
    authenticated:state.session.authenticated
});

const mapDispatchToProps = (dispatch)=>({
    authenticateUser(e){
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username,password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);