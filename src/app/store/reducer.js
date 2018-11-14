import { combineReducers } from 'redux';
import * as mutations from './mutations'

let defaultState = {
    session:{},
    comments:[],
    users:[],
    groups:[],
    tasks:[]
};

export const reducer = combineReducers({
    session(userSession = defaultState.session,action){
        let {type,authenticated, session} = action;
        switch(type){
            case mutations.SET_STATE:
                return {...userSession, id: action.state.session.id};
            case mutations.REQUEST_AUTHENTICATE_USER:
                return {...userSession, authenticated:mutations.AUTHENTICATING};
            case mutations.PROCESSING_AUTHENTICATE_USER:
                return {...userSession, authenticated};
            default:
                return userSession;
        }
    },
    comments:(comments = defaultState.comments,action)=>{
        switch (action.type) {
            case mutations.ADD_TASK_COMMENT:
                let {type,owner,task,content,id} = action;
                return [...comments,{owner,task,content,id}];
            case mutations.SET_STATE:
                return action.state.comments;
        }
        return comments;
    },
    users:(users = defaultState.users,action)=>{
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.users;
        }
        return users;
    },
    groups:(groups = defaultState.groups,action)=>{
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.groups;
        }
        return groups;
    },
    tasks(tasks = defaultState.tasks,action){
        switch(action.type) {
            case mutations.SET_STATE:
                return action.state.tasks;
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
