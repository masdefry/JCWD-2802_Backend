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
exports.findUserProfile = void 0;
const connection_1 = require("../../connection");
const findUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.body;
        const findUser = yield connection_1.prisma.users.findFirst({
            where: {
                id: userId
            },
            select: {
                username: true, email: true, role: true
            }
        });
        res.status(200).send({
            error: true,
            message: 'Get Profile Success!',
            data: findUser
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findUserProfile = findUserProfile;
