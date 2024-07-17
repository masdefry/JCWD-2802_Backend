"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerify = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            throw { message: 'User Not Authorized!', status: 401 };
        const decodedToken = jsonwebtoken_1.default.verify(authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1], 'jcwd2802');
        req.body = decodedToken;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.jwtVerify = jwtVerify;
