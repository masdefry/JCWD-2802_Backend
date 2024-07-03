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
exports.authenticate = void 0;
const connection_1 = require("../../connection");
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
        res.status(200).send({
            error: false,
            message: 'Authentication Success!',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authenticate = authenticate;
