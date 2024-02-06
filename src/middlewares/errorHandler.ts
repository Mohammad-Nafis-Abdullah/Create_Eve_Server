import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const error = new Error(err);

    console.log("error");

    res.status(500).send({
        status: 500,
        message: error.message,
        route: req.originalUrl,
    });
};
