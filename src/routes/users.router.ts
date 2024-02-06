import express from "express";
import { verifyAdmin } from "../middlewares/verification.middleware";

const usersRouter = express.Router();

usersRouter
    .get("/sign-out", async (req, res, next) => {
        res.clearCookie("uid");
        res.location(req.headers.referer as string);
        res.status(200).send({ status: 200, signedOut: true });
    })
    .get("/is-admin/:uid", async (req, res, next) => {
        try {
            const { uid } = req.params;
            const user = await req.Collections.userCollection.findOne({ uid });
            if (user?.role === "admin" || user?.role === "owner") {
                res.status(200).send({ status: 200, admin: true });
            } else {
                res.status(200).send({ status: 200, admin: false });
            }
        } catch (err) {
            next(err);
        }
    })
    .get("/", verifyAdmin, async (req, res, next) => {
        try {
            // const query = { uid: { $ne: req.headers?.uid } };
            const result = await req.Collections.userCollection
                .find({})
                .toArray();
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    })
    .get("/:uid", async (req, res, next) => {
        try {
            const { uid } = req.params;
            const result = await req.Collections.userCollection.findOne({
                uid: uid,
            });
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    })
    .put("/make-admin/:uid", async (req, res, next) => {
        try {
            const { uid } = req.params;
            const user = await req.Collections.userCollection.updateOne(
                { uid: uid },
                {
                    $set: {
                        role: "admin",
                    },
                },
                { upsert: false }
            );
            res.status(200).send({ status: 200, data: user });
        } catch (err) {
            next(err);
        }
    })
    .put("/remove-admin/:uid", async (req, res, next) => {
        try {
            const { uid } = req.params;
            const user = await req.Collections.userCollection.updateOne(
                { uid: uid },
                {
                    $set: {
                        role: "user",
                    },
                },
                { upsert: false }
            );
            res.status(200).send({ status: 200, data: user });
        } catch (err) {
            next(err);
        }
    })
    .put("/:uid", async (req, res, next) => {
        try {
            const { uid } = req.params;
            const user = req.body;
            const filter = { uid };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await req.Collections.userCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.cookie("uid", uid);
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    });

export default usersRouter;
