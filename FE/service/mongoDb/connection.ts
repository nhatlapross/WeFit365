import {MongoClient, ServerApiVersion} from 'mongodb'
const MONGODB_URI:any = process.env.MONGODB_URI;

let client:any;

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
