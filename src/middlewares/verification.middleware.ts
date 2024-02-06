import { Request, Response, NextFunction } from "express";

// verify Owner
export const verifyOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const uid = req.cookies?.uid;
    const uid = req.headers?.uid;
    const user = await req.Collections.userCollection.findOne({ uid: uid });

    if (user?.role === "owner") {
        next();
    } else {
        res.status(403).send({
            status: 403,
            isOwner: false,
            message: "Unauthorized!",
        });
    }
};

// verify admin
export const verifyAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const uid = req.cookies?.uid;
    const uid = req.headers?.uid;
    const user = await req.Collections.userCollection.findOne({ uid: uid });

    if (user?.role === "admin" || user?.role === "owner") {
        next();
    } else {
        res.status(403).send({
            status: 403,
            isAdmin: false,
            message: "Unauthorized!",
        });
    }
};
