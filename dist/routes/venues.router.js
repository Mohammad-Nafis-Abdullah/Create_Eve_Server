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
const venuesRouter = express_1.default.Router();
venuesRouter
    .get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venues = yield req.Collections.allVenue.find({}).toArray();
        res.status(200).send({ status: 200, data: venues });
    }
    catch (err) {
        next(err);
    }
}))
    .get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venue = yield req.Collections.allVenue.findOne({
            _id: new mongodb_1.ObjectId(req.params.id),
        });
        res.status(200).send({ status: 200, data: venue });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = venuesRouter;
