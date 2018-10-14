import { createStore, combineReducers } from 'redux';
import * as mutations from './mutations'
import {  defaultState } from '../../server/defaultState'

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
                    return (task.id === action.id) ? {...task,complete:action.complete} : task;
                })
        }
        return tasks;
    }
});

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);