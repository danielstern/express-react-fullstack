import { take, put, select } from 'redux-saga/effects';
import {
    REQUEST_TASK_CREATION,
    createTask
} from './mutations'
import uuid from 'uuid';

/**
 * Reducers cannot have any randomness (the must be deterministic)
 * Since the action of creating a task involves generating a random ID, it is not pure.
 * When the response to an action is not deterministic in a Redux application, both Sagas and Thunks are appropriate.
 */
export function* taskCreationSaga(){
    while (true){
        const {groupID} = yield take(REQUEST_TASK_CREATION);
        const ownerID = yield select(state=>state.session.id);
        const taskID = uuid();
        yield put(createTask(taskID, groupID, ownerID));
    }
}