"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_schema_1 = require("../schema/collection.schema");
function createCollections(req, res, next) {
    if (req.originalUrl !== "/") {
        req.Collections = {};
        for (const key in collection_schema_1.collectionList) {
            req.Collections[key] =
                req.DB.collection(collection_schema_1.collectionList[key]);
        }
    }
    next();
}
exports.default = createCollections;
