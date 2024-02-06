import express from "express";

const subServiceRouter = express.Router();

subServiceRouter.route("/:type").get(async (req, res, next) => {
    try {
        const { type } = req.params;
        const result = await req.Collections.allSubServicesCollection
            .find({ type })
            .toArray();
        res.status(200).send({ status: 200, data: result });
    } catch (err) {
        next(err);
    }
});

export default subServiceRouter;
