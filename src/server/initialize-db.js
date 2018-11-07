import { defaultState } from './defaultState';
import { connectDB } from './connect-db'

// todo... get PROD url
// const url = `mongodb://localhost:27017/organizer`;

// This code initializes the database with sample users.
// Note, it does not drop the database - this can be done manually. Having code in your application that could drop your whole DB is a fairly risky choice.
(async function initializeDB(){
    let db = await connectDB();
    let user = await db.collection(`users`).findOne({id:"U1"});
    if (!user) {
        for (let collectionName in defaultState) {
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName]);
        }
    }
})();
