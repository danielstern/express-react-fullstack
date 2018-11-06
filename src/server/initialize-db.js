import { MongoClient } from 'mongodb';
import { defaultState } from './defaultState';
import { connectDB } from './connect-db'

// todo... get PROD url
const url = `mongodb://localhost:27017/organizer`;

(async function initializeDB(){
    let db = await connectDB();
    let user = await db.collection(`users`).findOne({id:"U1"});
    if (!user) {
        for (let collectionName in defaultState) {
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName]);
        }
    }

    // await client.close();
})();
