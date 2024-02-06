import express from "express";
import { verifyAdmin } from "../middlewares/verification.middleware";
import { ObjectId } from "mongodb";

const bookingsRouter = express.Router();

bookingsRouter
    .get("/user/:uid", async (req, res, next) => {
        try {
            const { uid } = req.params;
            const query = { userId: uid };
            const myBookings = await req.Collections.allBookingCollection
                .find(query)
                .toArray();
            res.status(200).send({
                status: 200,
                data: myBookings,
            });
        } catch (err) {
            next(err);
        }
    })
    .get("/", verifyAdmin, async (req, res, next) => {
        try {
            const { limit, page } = req.query;
            const dataLength =
                await req.Collections.allBookingCollection.countDocuments();
            const totalPages = Math.ceil(
                dataLength / (parseInt(limit as string) || dataLength)
            );
            const bookings = await req.Collections.allBookingCollection
                .find({})
                .sort({ _id: -1 })
                .skip(
                    parseInt(limit as string) * (parseInt(page as string) - 1)
                )
                .limit(parseInt(limit as string))
                .toArray();
            res.status(200).send({
                status: 200,
                data: { bookings, totalPages, totalBookings: dataLength },
            });
        } catch (err) {
            next(err);
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const booking = await req.Collections.allBookingCollection.findOne(
                query
            );
            res.status(200).send({
                status: 200,
                data: booking,
            });
        } catch (err) {
            next(err);
        }
    })
    .post("/venue", async (req, res, next) => {
        try {
            const bookingVenue =
                await req.Collections.allBookingVenueCollection.insertOne(
                    req.body
                );
            res.status(200).send({ status: 200, data: bookingVenue });
        } catch (err) {
            next(err);
        }
    })
    .post("/", async (req, res, next) => {
        try {
            const result = await req.Collections.allBookingCollection.insertOne(
                req.body
            );
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    })
    .put("/:id", async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await req.Collections.allBookingCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: req.body },
                { upsert: false }
            );
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    })
    .delete("/:id", async (req, res, next) => {
        try {
            const result = await req.Collections.allBookingCollection.deleteOne(
                {
                    _id: new ObjectId(req.params.id),
                }
            );
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    });

export default bookingsRouter;
