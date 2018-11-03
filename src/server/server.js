import { MongoClient } from 'mongodb';
import { defaultState } from './defaultState'

// todo... get PROD url
const url = `mongodb://localhost:27017/organizer`;

(async function(){
    let client = await MongoClient.connect(url);
    let db = client.db('organizer');
    let collection = db.collection(`tasks`);
    await collection.insertOne({name:"task1"});
    for (let collectionName in defaultState) {
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
    }
    await client.close();
})();