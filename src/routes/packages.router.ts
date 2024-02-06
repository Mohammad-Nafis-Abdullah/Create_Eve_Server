import express from "express";
import { verifyAdmin } from "../middlewares/verification.middleware";
import { ObjectId } from "mongodb";

const packagesRouter = express.Router();

packagesRouter
    .get("/category/:name", async (req, res, next) => {
        try {
            const { name } = req.params;
            const result = await req.Collections.allPackage.findOne({
                category: name,
            });
            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .put("/category/:name", verifyAdmin, async (req, res, next) => {
        try {
            const { name } = req.params;
            const result = await req.Collections.allPackage.updateOne(
                { category: name },
                { $set: req.body },
                { upsert: true }
            );

            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .put("/update/:category/:id", verifyAdmin, async (req, res, next) => {
        const { category, id } = req.params;
        const pkg = req.body;
        try {
            const result = await req.DB.collection(`all-${category}`).updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...pkg } },
                { upsert: false }
            );

            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .delete("/delete/:category/:id", verifyAdmin, async (req, res, next) => {
        try {
            const { category, id } = req.params;
            const result = await req.DB.collection(`all-${category}`).deleteOne(
                { _id: new ObjectId(id) }
            );

            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .get("/:category/collection", async (req, res, next) => {
        try {
            const { category } = req.params;
            const { range, sort } = req.query;

            if (parseInt(range as string)) {
                const result = await req.DB.collection(`all-${category}`)
                    .find({ price: { $lte: parseInt(range as string) } })
                    .sort({ price: Number(sort) ? "asc" : "desc" })
                    .toArray();

                res.status(200).send({
                    status: 200,
                    data: result,
                });
            } else {
                const result = await req.DB.collection(`all-${category}`)
                    .find({})
                    .sort({ price: sort ? "asc" : "desc" })
                    .toArray();

                res.status(200).send({
                    status: 200,
                    data: result,
                });
            }
        } catch (err) {
            next(err);
        }
    })
    .post("/:category/collection", async (req, res, next) => {
        try {
            const { category } = req.params;
            const result = await req.DB.collection(`all-${category}`).insertOne(
                req.body
            );

            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .get("/", async (req, res, next) => {
        try {
            const result = await req.Collections.allPackage.find().toArray();
            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    });

export default packagesRouter;
