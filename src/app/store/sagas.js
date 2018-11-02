import { take, put, select } from 'redux-saga/effects';
import * as mutations from './mutations';
import uuid from 'uuid';
import {  }from 'react-router'
import { history } from '../components/Main'
import axios from 'axios';

// todo... add prod url
const url = `http://localhost:7777`;

export function* taskCreationSaga(){

}

export function* userAuthenticationSaga(){
    while (true){
        const {username,password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = yield axios.post(url + `/authenticate`,{username,password});
            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
                id:"U1",
                token:data.token
            }));

            history.push(`/dashboard`);
            console.log(data);
        } catch (e) {
            // catch block handles failed login
        }
    }
}