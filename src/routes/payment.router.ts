import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const paymentRouter = express.Router();

paymentRouter.post("/", async (req, res, next) => {
    try {
        const totalPrice = req.body?.totalPrice;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: "usd",
            payment_method_types: ["card"],
        });
        res.status(200).send({
            status: 200,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        next(err);
    }
});

export default paymentRouter;
