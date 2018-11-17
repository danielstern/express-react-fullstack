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
};