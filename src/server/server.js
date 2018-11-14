import { MongoClient } from 'mongodb';

// todo... get PROD url
console.log("PRod or dev?",process.env.NODE_ENV);
const url = `mongodb://localhost:27017/organizer`;

// todo... move this initializer function into own file

// todo... add server routes
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import uuid from 'uuid';
import md5 from 'md5';
import './initialize-db';

import { connectDB } from './connect-db'
import { assembleUserState } from './utility';

let port = process.env.PORT || 7777;
let app = express();

console.log("Port?",port);

const authorizationTokens = [];

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);
app.listen(port,console.info("Server running, listening on port ", port));

app.get('/test',async (req,res)=>{
    res.send("42 hello!");
});

app.post('/authenticate',async (req,res)=>{
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection(`users`);

    let user = await collection.findOne({name:username});
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

    let state = await assembleUserState(user);

    res.send({token,state});
});

app.post('/task/new',async (req,res)=>{
    let task = req.body.task;
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
    res.status(200).send();
});

app.post('/task/update',async (req,res)=>{
    let db = await connectDB();
    let {id,group,isComplete,name} = req.body.task;
    let collection = db.collection(`tasks`);
    console.log(req.body.task);
    if (group) {
        await collection.updateOne({id},{$set:{group}});
    }
    if (name) {
        await collection.updateOne({id},{$set:{name}});
    }
    if (isComplete !== undefined) {
        await collection.updateOne({id},{$set:{isComplete}});
    }

    res.status(200).send();
});

app.post('/comment/new',async (req,res)=>{
    let comment = req.body.comment;
    let db = await connectDB();
    let collection = db.collection(`comments`);
    await collection.insertOne(comment);
    res.status(200).send();
});