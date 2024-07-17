"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationAuth = void 0;
const validationAuth = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw { message: 'Email & Password Must be Filled!', status: 400 };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validationAuth = validationAuth;
