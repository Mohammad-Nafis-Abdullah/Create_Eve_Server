import { Request, Response, NextFunction } from "express";
import {
    Collections_schema,
    collectionList,
} from "../schema/collection.schema";

export default function createCollections(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.originalUrl !== "/") {
        req.Collections = {} as Collections_schema;

        for (const key in collectionList) {
            req.Collections[key as keyof Collections_schema] =
                req.DB.collection(
                    collectionList[key as keyof Collections_schema]
                );
        }
    }

    next();
}
