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
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "");
const paymentRouter = express_1.default.Router();
paymentRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalPrice = (_a = req.body) === null || _a === void 0 ? void 0 : _a.totalPrice;
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: totalPrice,
            currency: "usd",
            payment_method_types: ["card"],
        });
        res.status(200).send({
            status: 200,
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = paymentRouter;
