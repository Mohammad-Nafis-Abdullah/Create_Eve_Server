"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@create-eve.svsmukc.mongodb.net/?retryWrites=true&w=majority`;
const DB_NAME = "create-eve-db";
const client = new mongodb_1.MongoClient(URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function mongodbConnect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.originalUrl === "/") {
            next();
        }
        else {
            try {
                yield client.connect();
                const db = client.db(DB_NAME);
                req.MongoClient = client;
                req.DB = db;
                next();
            }
            catch (err) {
                next(err);
            }
        }
    });
}
exports.default = mongodbConnect;
