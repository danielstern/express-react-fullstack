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

app.post('/authenticate',(req,res)=>{
    let { username, password } = req.body;
    let user = defaultState.users.find(user=>user.name === username);
    if (!user) {
        return res.status(500).send(`User not found`);
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
        return res.status(500).send('Password incorrect');
    }

    let token = uuid();

    authorizationTokens.push({
        token,
        userID: user.id
    });

    let associatedUsers = defaultState.users.filter(otherUser=>user.friends.includes(otherUser.id))
    .map(user=>({
        name:user.name,
        id: user.id
    }));

    let associatedTasks = defaultState.tasks.filter(task=>task.owner === user.id);
    let associatedComments = defaultState.comments.filter(comment=>associatedTasks.map(task=>task.id).includes(comment.task))

    let state = {
        session:{authenticated:`AUTHENTICATED`,id:user.id},
        groups:defaultState.groups.filter(group=>group.owner === user.id),
        tasks:associatedTasks,
        users: [user, ... associatedUsers],
        comments:associatedComments
    };

    res.send({token,state});
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