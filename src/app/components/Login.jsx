/**
 * The login route component contains a simple form that checks authentication data via the server.
 */

import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LoginComponent = ({authenticateUser,authenticated})=>(
    <div className="card p-3 col-6">
        <h2>
            Please login
        </h2>
        <h3>
            <Link to="signup">
                Don't have an account? Sign up.
            </Link>
        </h3>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev" className="form-control"/>
            <input type="password" placeholder="password" name="password" defaultValue="TUPLES" className="form-control mt-2"/>
            {authenticated === mutations.NOT_AUTHENTICATED ?
                <p>
                    Login incorrect.
                </p> : null
            }
            <button type="submit" disabled={authenticated === `PROCESSING`} className="form-control mt-2 btn btn-primary">
                Login
            </button>
        </form>
    </div>
);

const mapStateToProps = ({session})=>({
    authenticated:session.authenticated
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