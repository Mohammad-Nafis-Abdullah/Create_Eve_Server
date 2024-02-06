import express from "express";
import { ObjectId } from "mongodb";

const venuesRouter = express.Router();

venuesRouter
    .get("/", async (req, res, next) => {
        try {
            const venues = await req.Collections.allVenue.find({}).toArray();
            res.status(200).send({ status: 200, data: venues });
        } catch (err) {
            next(err);
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const venue = await req.Collections.allVenue.findOne({
                _id: new ObjectId(req.params.id),
            });
            res.status(200).send({ status: 200, data: venue });
        } catch (err) {
            next(err);
        }
    });

export default venuesRouter;
