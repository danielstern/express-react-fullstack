import { takeEvery, select } from 'redux-saga/effects';
import { REQUEST_TASK_DETAILS } from './events'

export function* TaskDetailsSaga(e) {
    yield takeEvery(REQUEST_TASK_DETAILS,function*({id}){
        let { tasks, users } = yield select();
        let task = tasks.find(task=>task.id === id);
    })
}