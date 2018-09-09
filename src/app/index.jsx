console.log("Application running");

import { post } from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './main.less';
import uuid from 'uuid';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider, Connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { ConnectedGroupContainer } from './components/TaskList';


const run = async()=>{
    let {data} = await post('//localhost:7777/board');
    console.log(data);
};
run();

const ProtoAppState = {
    groups:[{
        name:"To Do",
        id:"G1"
    },{
        name:"Doing",
        id:"G2"
    }],
    tasks:[{
        name:"Refactor Tests",
        id:"T1",
        parent:"G1"
    },{
        name:"Meet with CTO",
        id:"T2",
        parent:"G1"
    },{
        name:"Compile ES6",
        id:"T3",
        parent:"G2"
    }],
    comments:[{
        owner:"U1",
        id:"C1",
        task:"T1",
        content:"Great work!"
    }]
};

const store = createStore(()=>ProtoAppState);



const Dashboard = ()=>(
    <div>
        {ProtoAppState.groups.map(group=>(
            <ConnectedGroupContainer key={group.id} {...group}/>
        ))}
    </div>
)

const TaskDetails = ({match})=>{
    let id = match.params.id;
    let task = ProtoAppState.tasks.find(task=>task.id === id);
    return (
        <div>
            <h3>
                {task.name}
            </h3>
        </div>
    )
}
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>

        <div>
            <div className="header">
                <h1>
                    Welcome, Daniel!
                </h1>
            </div>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/task/:id" component={TaskDetails}/>
        </div>
        </Provider>
    </BrowserRouter>,
    document.getElementById("app")
)