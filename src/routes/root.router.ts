import express from "express";

const rootRouter = express.Router();

rootRouter.route("/").get(async (req, res) => {
    res.status(200).send({
        status: 200,
        message: `CREATE-EVE server is running at : https://${req.hostname}`,
        route: req.originalUrl,
    });
});

export default rootRouter;
