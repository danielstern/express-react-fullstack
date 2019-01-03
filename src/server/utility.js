import { connectDB } from './connect-db'

export async function assembleUserState(user){
    let db = await connectDB();

    let tasks = await db.collection(`tasks`).find({owner:user.id}).toArray();
    let comments = await db.collection(`comments`).find({task:{$in:tasks.map(task=>task.id)}}).toArray();
    let users = [
        await db.collection(`users`).findOne({id:user.id}),
        ...await db.collection(`users`).find({id:{$in:[...tasks,comments].map(x=>x.owner)}}).toArray()
    ];

    return {
        session:{authenticated:`AUTHENTICATED`,id:user.id},
        groups:await db.collection(`groups`).find({owner:user.id}).toArray(),
        tasks,
        users,
        comments
    };
}