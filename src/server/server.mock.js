/**
 * This mock server does not communicate with the DB and therefore does not provide data persistence.
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { defaultState } from './defaultState';
import uuid from 'uuid';
import md5 from 'md5';

let port = 7777;
let app = express();

const authorizationTokens = [];

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);
app.listen(port,console.info("Server running, listening on port ", port));

app.get('/user/:id',(req,res)=>{
    let user = defaultState.users.find(user=>user.id === req.params.id);
    if (!user) {
        res.status(500).send();
    } else {
        res.json(user);
    }
});


app.post(`/task/new`,(req,res)=>{
    let { task } = req.body;
    res.status(200).send();
});

app.post(`/task/update`,(req,res)=>{
    let { task } = req.body;
    res.status(200).send();
});

app.post(`comment/new`,(req,res)=>{
    res.status(200).send();
});