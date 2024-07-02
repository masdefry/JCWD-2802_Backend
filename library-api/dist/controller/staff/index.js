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
exports.auth = void 0;
const connection_1 = require("../../connection");
const date_fns_1 = require("date-fns");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findStaff = yield connection_1.prisma.staff.findFirst({
            where: {
                AND: [
                    {
                        email,
                        password
                    }
                ]
            }
        });
        console.log(findStaff);
        if (findStaff === null)
            throw { message: 'Login Failed! Username & Password Doesnt Match!', status: 401 };
        const { clockIn, clockOut } = yield connection_1.prisma.staffSchedule.findFirst({
            where: {
                staffUid: findStaff.uid
            }
        });
        const isClockIn = (0, date_fns_1.isAfter)(((0, date_fns_1.lightFormat)(new Date(), 'yyyy-MM-dd HH:mm:ss')), (`${(0, date_fns_1.lightFormat)(new Date(), 'yyyy-MM-dd')} ${(0, date_fns_1.lightFormat)(new Date(clockIn), 'HH:mm:ss')}`));
        const isClockOut = (0, date_fns_1.isBefore)(((0, date_fns_1.lightFormat)(new Date(), 'yyyy-MM-dd HH:mm:ss')), (`${(0, date_fns_1.lightFormat)(new Date(), 'yyyy-MM-dd')} ${(0, date_fns_1.lightFormat)(new Date(clockOut), 'HH:mm:ss')}`));
        if (!isClockIn || !isClockOut)
            throw { message: 'You Are Not in Shift Time!', status: 401 };
        res.status(200).send({
            error: false,
            message: 'Login Success!',
            data: {}
        });
    }
    catch (error) {
        res.status(error.status).send({
            error: true,
            message: error.message,
            data: {}
        });
    }
});
exports.auth = auth;
