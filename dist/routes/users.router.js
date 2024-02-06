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
const usersRouter = express_1.default.Router();
usersRouter
    .get("/sign-out", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("uid");
    res.location(req.headers.referer);
    res.status(200).send({ status: 200, signedOut: true });
}))
    .get("/is-admin/:uid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield req.Collections.userCollection.findOne({ uid });
        if ((user === null || user === void 0 ? void 0 : user.role) === "admin" || (user === null || user === void 0 ? void 0 : user.role) === "owner") {
            res.status(200).send({ status: 200, admin: true });
        }
        else {
            res.status(200).send({ status: 200, admin: false });
        }
    }
    catch (err) {
        next(err);
    }
}))
    .get("/", verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const query = { uid: { $ne: req.headers?.uid } };
        const result = yield req.Collections.userCollection
            .find({})
            .toArray();
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/:uid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const result = yield req.Collections.userCollection.findOne({
            uid: uid,
        });
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}))
    .put("/make-admin/:uid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield req.Collections.userCollection.updateOne({ uid: uid }, {
            $set: {
                role: "admin",
            },
        }, { upsert: false });
        res.status(200).send({ status: 200, data: user });
    }
    catch (err) {
        next(err);
    }
}))
    .put("/remove-admin/:uid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield req.Collections.userCollection.updateOne({ uid: uid }, {
            $set: {
                role: "user",
            },
        }, { upsert: false });
        res.status(200).send({ status: 200, data: user });
    }
    catch (err) {
        next(err);
    }
}))
    .put("/:uid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = req.body;
        const filter = { uid };
        const options = { upsert: true };
        const updateDoc = {
            $set: user,
        };
        const result = yield req.Collections.userCollection.updateOne(filter, updateDoc, options);
        res.cookie("uid", uid);
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = usersRouter;
