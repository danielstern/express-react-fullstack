import uuid from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db'
import { assembleUserState } from './utility';

const authenticationTokens = [];


export const authenticationRoute = app => {
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

        authenticationTokens.push({
            token,
            userID: user.id
        });

        let state = await assembleUserState(user);

        res.send({token,state});
    });

    app.post('/user/create',async(req,res)=>{
        let {username,password} = req.body;
        console.log(username,password);
        let db = await connectDB();
        let collection = db.collection(`users`);
        let user = await collection.findOne({name:username});
        if (user) {
            res.status(500).send({message:"A user with that account name already exists."});
            return;
        };

        let userID = uuid();
        let groupID = uuid();

        await collection.insertOne({
            name:username,
            id:userID,
            passwordHash:md5(password)
        });

        await db.collection(`groups`).insertOne({
            id:groupID,
            owner:userID,
            name: `To Do`
        });

        let state = await assembleUserState({id:userID,name:username});

        res.status(200).send({userID,state});
    });
};