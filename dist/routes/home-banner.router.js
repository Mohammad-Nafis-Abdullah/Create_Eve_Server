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
const homeBannerRouter = express_1.default.Router();
homeBannerRouter
    .route("/")
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield req.Collections.allBannerImages
            .find({})
            .toArray();
        res.status(200).send({ status: 200, data: result });
    }
    catch (err) {
        next(err);
    }
}))
    .post(verification_middleware_1.verifyAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banners = req.body;
        yield req.Collections.allBannerImages.deleteMany({});
        yield req.Collections.allBannerImages.insertMany(banners);
        res.status(200).send({ status: 200, upload: true });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = homeBannerRouter;
