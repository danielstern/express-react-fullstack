import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import * as mutations from './mutations'
import {  defaultState } from '../../server/defaultState'

const sagaMiddleware = createSagaMiddleware();

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
                })
        }
        return tasks;
    }
});

export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
