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
exports.register = exports.authenticate = void 0;
const connection_1 = require("../../connection");
const jwt_1 = require("../../helper/jwt");
const transporter_1 = require("../../helper/transporter");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield connection_1.prisma.users.findFirst({
            where: {
                AND: [
                    {
                        email, password
                    }
                ]
            }
        });
        if (findUser === null)
            throw { message: 'Authentication Failed! Email & Password Doesnt Match!', status: 401 };
        const token = (0, jwt_1.createToken)({
            userId: findUser.id,
            role: findUser.role
        });
        res.status(200).send({
            error: false,
            message: 'Authentication Success!',
            data: {
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authenticate = authenticate;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        // Find Email on Database: prisma.user.findMany
        // Email Exist, Throw Error: If(findUser) throw Error
        // Insert Register User into Table: prisma.user.create
        // Send Email Verification
        yield transporter_1.transporter.sendMail({
            to: email,
            subject: 'Email Verification',
            html: '<h1>Welcome as New User!</h1> <p>To activate your account, clik link below: </p><h1>Link Verification</h1>'
        });
        // Send Response
        res.status(201).send({
            error: false,
            message: 'Register Success!',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
