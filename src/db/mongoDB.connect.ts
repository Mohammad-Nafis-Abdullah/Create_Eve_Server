import { Request, Response, NextFunction } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@create-eve.svsmukc.mongodb.net/?retryWrites=true&w=majority`;
const DB_NAME = "create-eve-db";

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export default async function mongodbConnect(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.originalUrl === "/") {
        next();
    } else {
        try {
            await client.connect();


            const db = client.db(DB_NAME);
            req.MongoClient = client;
            req.DB = db;
            
            next();
        } catch (err) {
            next(err);
        }
    }
}
