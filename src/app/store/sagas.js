import { takeEvery } from 'redux-saga/effects';

export function* FetchUserDetailsSaga(e){
    console.log("Fetching the user's detail",e);
    yield takeEvery(`REQUEST_USER_DATA`,()=>{
        console.log("DATA REQUEST!!!, oh yeah");
    })
}