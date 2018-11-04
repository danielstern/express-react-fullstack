import { MongoClient } from 'mongodb';

// todo... get PROD url
const url = `mongodb://localhost:27017/organizer`;

// todo... move this initializer function into own file

// todo... add server routes
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { defaultState } from './defaultState';
import uuid from 'uuid';
import md5 from 'md5';
import './initialize-db';

let port = 7777;
let app = express();

const authorizationTokens = [];

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);
app.listen(port,console.info("Server running, listening on port ", port));

async function assembleUserState(user){

    let client = await MongoClient.connect(url);
    let db = client.db('organizer');

    let state = {
        session:{authenticated:`AUTHENTICATED`,id:user.id},
        groups:await db.collection(`groups`).find({owner:user.id}).toArray(),
        tasks:await db.collection(`tasks`).find({owner:user.id}).toArray(),
        users: [],
        comments:[]
    };

    return state;
}

app.post('/authenticate',async (req,res)=>{
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
    //
    // let associatedUsers = defaultState.users.filter(otherUser=>user.friends.includes(otherUser.id))
    //     .map(user=>({
    //         name:user.name,
    //         id: user.id
    //     }));
    //
    // let associatedTasks = defaultState.tasks.filter(task=>task.owner === user.id);
    // let associatedComments = defaultState.comments.filter(comment=>associatedTasks.map(task=>task.id).includes(comment.task))
    //
    // // todo... move state assemblage to own utility
    // let state = {
    //     session:{authenticated:`AUTHENTICATED`,id:user.id},
    //     groups:defaultState.groups.filter(group=>group.owner === user.id),
    //     tasks:associatedTasks,
    //     users: [user, ... associatedUsers],
    //     comments:associatedComments
    // };

    let state = await assembleUserState(user);

    console.log(state);

    res.send({token,state});
});

// todo... centralize DB connection logic
app.post('/task/new',async (req,res)=>{
    let task = req.body.task;
    let client = await MongoClient.connect(url);
    let db = client.db('organizer');
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
    res.status(200).send();
});