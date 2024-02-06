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
const mongodb_1 = require("mongodb");
const verification_middleware_1 = require("../middlewares/verification.middleware");
const servicesRouter = express_1.default.Router();
servicesRouter
    .get("/type/:name", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const result = yield req.DB.collection(`all-${name}`)
            .find({})
            .sort({ price: 1 })
            .toArray();
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .post("/type/:name", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const result = yield req.DB.collection(`all-${name}`).insertOne(req.body);
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .put("/type/:name/:id", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.params;
    const service = req.body;
    try {
        const result = yield req.DB.collection(`all-${name}`).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign({}, service) }, { upsert: false });
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .delete("/type/:name/:id", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.params;
    try {
        const result = yield req.DB.collection(`all-${name}`).deleteOne({
            _id: new mongodb_1.ObjectId(id),
        });
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSingleServiceById = yield req.Collections.allServiceCollection.findOne({
            _id: new mongodb_1.ObjectId(req.params.id),
        });
        res.status(200).send({ status: 200, data: getSingleServiceById });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllServices = yield req.Collections.allServiceCollection
            .find({})
            .toArray();
        res.status(200).send({ status: 200, data: getAllServices });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = servicesRouter;
