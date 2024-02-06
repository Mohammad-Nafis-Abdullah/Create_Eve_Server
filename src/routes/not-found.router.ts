import express from "express";

const notFoundRouter = express.Router();

notFoundRouter.route("/").all(async (req, res) => {
    res.status(404).send({
        status: 404,
        message: "Not Found",
        route: req.originalUrl,
    });
});

export default notFoundRouter;
