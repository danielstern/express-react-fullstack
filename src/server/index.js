import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { defaultState } from './defaultState';

let port = 7780;
let app = express();

app.use(cors(), bodyParser.urlencoded({extended:true}), bodyParser.json());
app.listen(port,console.info("Server running, listening on port ", port));
app.post('/board',(req,res)=>{
    res.send({message:"Successfully communicated between server and app"});
});

app.get('/user/:id',(req,res)=>{

    let user = defaultState.users.find(user=>user.id === req.params.id);
    if (!user) {
        res.status(500).send();
    } else {
        res.json(user);
    }


})