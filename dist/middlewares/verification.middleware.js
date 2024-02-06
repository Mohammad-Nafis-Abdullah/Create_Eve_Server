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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyOwner = void 0;
// verify Owner
const verifyOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const uid = req.cookies?.uid;
    const uid = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.uid;
    const user = yield req.Collections.userCollection.findOne({ uid: uid });
    if ((user === null || user === void 0 ? void 0 : user.role) === "owner") {
        next();
    }
    else {
        res.status(403).send({
            status: 403,
            isOwner: false,
            message: "Unauthorized!",
        });
    }
});
exports.verifyOwner = verifyOwner;
// verify admin
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // const uid = req.cookies?.uid;
    const uid = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.uid;
    const user = yield req.Collections.userCollection.findOne({ uid: uid });
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin" || (user === null || user === void 0 ? void 0 : user.role) === "owner") {
        next();
    }
    else {
        res.status(403).send({
            status: 403,
            isAdmin: false,
            message: "Unauthorized!",
        });
    }
});
exports.verifyAdmin = verifyAdmin;
