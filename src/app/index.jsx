import React from 'react';
import ReactDOM from 'react-dom';
import './main.less';
import { Main } from './components/Main';
import createHistory from "history/createBrowserHistory";


ReactDOM.render(
    <Main/>,
    document.getElementById("app")
)