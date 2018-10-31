import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import * as mutations from './mutations'
import { taskCreationSaga } from './sagas'
import {  defaultState } from '../../server/defaultState'

const sagaMiddleware = createSagaMiddleware();

/**
 * Todo... seprate reducer logic into appropriate separate files
 */

const reducer = combineReducers({
    session:()=>defaultState.session,
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
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(taskCreationSaga);
