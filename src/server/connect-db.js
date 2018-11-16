import { MongoClient } from 'mongodb';
// const url = `mongodb://localhost:27017/organizer`;
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/organizer`;
console.log("URI?",url,process.env);
let db = null;

export async function connectDB(){
    if (db) return db;
    let client = await MongoClient.connect(url);
    // db = client.db('organizer');
    db = client.db();
    return db;
}