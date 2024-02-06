import { Collection, Db, Document, MongoClient } from "mongodb";
import { Collections_schema, collectionList } from "./collection.schema";

/* Extend the Request interface in place to include your custom variable */
declare global {
    namespace Express {
        interface Request {
            MongoClient: MongoClient;
            DB: Db;
            Collections: Collections_schema;
        }
        interface Response {}
    }
}

export {};
