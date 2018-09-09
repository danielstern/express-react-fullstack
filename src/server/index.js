import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let port = 7778;
let app = express();

app.use(cors(), bodyParser.urlencoded({extended:true}), bodyParser.json());
app.listen(port,console.log("Server running, listening on port ", port));
app.post('/board',(req,res)=>{
    res.send({message:"Successfully communicated between server and app"});
});