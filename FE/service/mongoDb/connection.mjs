import {MongoClient, ServerApiVersion} from 'mongodb'
const MONGODB_URI = process.env.MONGODB_URI;

let client;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(MONGODB_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await client.connect();
    }
    return client;
}
