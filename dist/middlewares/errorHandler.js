"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const error = new Error(err);
    console.log("error");
    res.status(500).send({
        status: 500,
        message: error.message,
        route: req.originalUrl,
    });
};
exports.errorHandler = errorHandler;
