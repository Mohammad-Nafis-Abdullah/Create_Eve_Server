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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verification_middleware_1 = require("../middlewares/verification.middleware");
const mongodb_1 = require("mongodb");
const bookingsRouter = express_1.default.Router();
bookingsRouter
    .get("/user/:uid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const query = { userId: uid };
        const myBookings = yield req.Collections.allBookingCollection
            .find(query)
            .toArray();
        res.status(200).send({
            status: 200,
            data: myBookings,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page } = req.query;
        const dataLength = yield req.Collections.allBookingCollection.countDocuments();
        const totalPages = Math.ceil(dataLength / (parseInt(limit) || dataLength));
        const bookings = yield req.Collections.allBookingCollection
            .find({})
            .sort({ _id: -1 })
            .skip(parseInt(limit) * (parseInt(page) - 1))
            .limit(parseInt(limit))
            .toArray();
        res.status(200).send({
            status: 200,
            data: { bookings, totalPages, totalBookings: dataLength },
        });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const booking = yield req.Collections.allBookingCollection.findOne(query);
        res.status(200).send({
            status: 200,
            data: booking,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .post("/venue", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingVenue = yield req.Collections.allBookingVenueCollection.insertOne(req.body);
        res.status(200).send({ status: 200, data: bookingVenue });
    }
    catch (err) {
        next(err);
    }
}))
    .post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield req.Collections.allBookingCollection.insertOne(req.body);
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}))
    .put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield req.Collections.allBookingCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: req.body }, { upsert: false });
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}))
    .delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield req.Collections.allBookingCollection.deleteOne({
            _id: new mongodb_1.ObjectId(req.params.id),
        });
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = bookingsRouter;
