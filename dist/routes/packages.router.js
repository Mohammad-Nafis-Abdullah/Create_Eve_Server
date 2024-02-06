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
const packagesRouter = express_1.default.Router();
packagesRouter
    .get("/category/:name", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const result = yield req.Collections.allPackage.findOne({
            category: name,
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
    .put("/category/:name", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const result = yield req.Collections.allPackage.updateOne({ category: name }, { $set: req.body }, { upsert: true });
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .put("/update/:category/:id", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, id } = req.params;
    const pkg = req.body;
    try {
        const result = yield req.DB.collection(`all-${category}`).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign({}, pkg) }, { upsert: false });
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .delete("/delete/:category/:id", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, id } = req.params;
        const result = yield req.DB.collection(`all-${category}`).deleteOne({ _id: new mongodb_1.ObjectId(id) });
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/:category/collection", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const { range, sort } = req.query;
        if (parseInt(range)) {
            const result = yield req.DB.collection(`all-${category}`)
                .find({ price: { $lte: parseInt(range) } })
                .sort({ price: Number(sort) ? "asc" : "desc" })
                .toArray();
            res.status(200).send({
                status: 200,
                data: result,
            });
        }
        else {
            const result = yield req.DB.collection(`all-${category}`)
                .find({})
                .sort({ price: sort ? "asc" : "desc" })
                .toArray();
            res.status(200).send({
                status: 200,
                data: result,
            });
        }
    }
    catch (err) {
        next(err);
    }
}))
    .post("/:category/collection", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const result = yield req.DB.collection(`all-${category}`).insertOne(req.body);
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield req.Collections.allPackage.find().toArray();
        res.status(200).send({
            status: 200,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = packagesRouter;
