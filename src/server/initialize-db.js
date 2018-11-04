import { MongoClient } from 'mongodb';
import { defaultState } from './defaultState';

// todo... get PROD url
const url = `mongodb://localhost:27017/organizer`;

(async function initializeDB(){
    let client = await MongoClient.connect(url);
    let db = client.db('organizer');
    let user = await db.collection(`users`).findOne({id:"U1"});
    if (!user) {
        for (let collectionName in defaultState) {
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName]);
        }
    }

    await client.close();
})();
