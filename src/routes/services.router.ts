import express from "express";
import { ObjectId } from "mongodb";
import { verifyAdmin } from "../middlewares/verification.middleware";

const servicesRouter = express.Router();

servicesRouter
    .get("/type/:name", async (req, res, next) => {
        try {
            const { name } = req.params;
            const result = await req.DB.collection(`all-${name}`)
                .find({})
                .sort({ price: 1 })
                .toArray();

            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .post("/type/:name", async (req, res, next) => {
        try {
            const { name } = req.params;
            const result = await req.DB.collection(`all-${name}`).insertOne(
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
    .put("/type/:name/:id", verifyAdmin, async (req, res, next) => {
        const { name, id } = req.params;
        const service = req.body;
        try {
            const result = await req.DB.collection(`all-${name}`).updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...service } },
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
    .delete("/type/:name/:id", verifyAdmin, async (req, res, next) => {
        const { name, id } = req.params;
        try {
            const result = await req.DB.collection(`all-${name}`).deleteOne({
                _id: new ObjectId(id),
            });

            res.status(200).send({
                status: 200,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const getSingleServiceById =
                await req.Collections.allServiceCollection.findOne({
                    _id: new ObjectId(req.params.id),
                });

            res.status(200).send({ status: 200, data: getSingleServiceById });
        } catch (err) {
            next(err);
        }
    })
    .get("/", async (req, res, next) => {
        try {
            const getAllServices = await req.Collections.allServiceCollection
                .find({})
                .toArray();
            res.status(200).send({ status: 200, data: getAllServices });
        } catch (err) {
            next(err);
        }
    });

export default servicesRouter;
