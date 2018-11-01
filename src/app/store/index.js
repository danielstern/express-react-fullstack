import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import * as mutations from './mutations'
import * as sagas from './sagas.mock'
// import { taskCreationSaga } from './sagas.mock'
import { defaultState } from '../../server/defaultState'
import {createLogger} from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();

/**
 * Todo... seprate reducer logic into appropriate separate files
 */

const reducer = combineReducers({
    session(userSession = defaultState.session,{type,authenticated, session}){
        switch(type){
            case mutations.REQUEST_AUTHENTICATE_USER:
                return {...userSession, authenticated:`PROCESSING`}
            case mutations.PROCESSING_AUTHENTICATE_USER:
                return {authenticated:`AUTHENTICATED`,...session};
            default:
                return userSession;
        }
    },
    comments:(comments = defaultState.comments,{type,owner,task,content,id})=>{
        switch (type) {
            case mutations.ADD_TASK_COMMENT:
                return [...comments,{owner,task,content,id}]
        }
        return comments;
    },
    users:()=>defaultState.users,
    groups:()=>defaultState.groups,
    tasks(tasks = defaultState.tasks,action){
        switch(action.type) {
            case mutations.SET_TASK_COMPLETE:
                return tasks.map(task=>{
                    return (task.id === action.id) ? {...task,isComplete:action.isComplete} : task;
                });
            case mutations.SET_TASK_GROUP:
                return tasks.map(task=>{
                    return (task.id === action.taskID) ? {...task, group:action.groupID} : task;
                });
            case mutations.SET_TASK_NAME:
                return tasks.map(task=> {
                    return (task.id === action.taskID) ? {...task, name: action.name} : task;
                });
            case mutations.CREATE_TASK:
                return [...tasks,{
                    id:action.taskID,
                    name:"New Task",
                    group:action.groupID,
                    owner:action.ownerID,
                    isComplete:false
                }]
        }
        return tasks;
    }
});

export const store = createStore(
    reducer,
    applyMiddleware(createLogger(), sagaMiddleware)
);

sagaMiddleware.run(sagas.taskCreationSaga);
sagaMiddleware.run(sagas.userAuthenticationSaga);
