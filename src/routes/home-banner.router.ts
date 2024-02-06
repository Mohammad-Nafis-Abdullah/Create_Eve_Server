import express from "express";
import { verifyAdmin } from "../middlewares/verification.middleware";

const homeBannerRouter = express.Router();

homeBannerRouter
    .route("/")
    .get(async (req, res, next) => {
        try {
            const result = await req.Collections.allBannerImages
                .find({})
                .toArray();
            res.status(200).send({ status: 200, data: result });
        } catch (err) {
            next(err);
        }
    })
    .post(verifyAdmin, async (req, res, next) => {
        try {
            const banners = req.body;
            await req.Collections.allBannerImages.deleteMany({});
            await req.Collections.allBannerImages.insertMany(banners);
            res.status(200).send({ status: 200, upload: true });
        } catch (err) {
            next(err);
        }
    });

export default homeBannerRouter;
