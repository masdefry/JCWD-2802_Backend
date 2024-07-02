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
exports.returnTransaction = exports.createTransaction = exports.createBook = exports.createMember = exports.auth = void 0;
const connection_1 = require("../../connection");
const date_fns_1 = require("date-fns");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error);
    }
});
exports.auth = auth;
const createMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, address, phoneNumber, birthDate } = req.body;
        yield connection_1.prisma.member.create({
            data: { username, address, phoneNumber, birthDate: new Date(birthDate) }
        });
        res.status(201).send({
            error: false,
            message: 'Create Member Success!',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createMember = createMember;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, publishYear, genre, isbn, branch_id } = req.body;
        const createdBook = yield connection_1.prisma.book.create({
            data: {
                title,
                author,
                publishYear: new Date(publishYear),
                genre,
                isbn
            }
        });
        const distributedBooks = [];
        branch_id.forEach((item) => {
            distributedBooks.push({ bookId: createdBook.id, libraryBranchId: item });
        });
        yield connection_1.prisma.libraryBranchBook.createMany({
            data: distributedBooks
        });
        res.status(201).send({
            error: false,
            message: 'Create Book Success!',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const createTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberUid, staffUid, books } = req.body;
        if (books.length > 3)
            throw { message: 'Book Qty is Over Limit!', status: 400 };
        const createdTransaction = yield connection_1.prisma.transaction.create({
            data: {
                borrowingDate: new Date(),
                returnDate: (0, date_fns_1.addDays)(new Date(), 5),
                totalPrice: 0,
                memberUid,
                staffUid
            }
        });
        books.forEach(item => {
            item.transactionId = createdTransaction.id;
        });
        yield connection_1.prisma.transactionDetail.createMany({
            data: books
        });
        res.status(201).send({
            error: false,
            message: 'Create Transaction Success!',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createTransaction = createTransaction;
const returnTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idTransaction } = req.params;
        const findTransaction = yield connection_1.prisma.transaction.findFirst({
            where: {
                id: parseInt(idTransaction)
            }
        });
        if (!findTransaction)
            throw { message: 'Transaction Not Found!', status: 404 };
        if (findTransaction.fine !== null)
            throw { message: 'Transaction Has Been Completed!', status: 400 };
        const returnDate = new Date((0, date_fns_1.lightFormat)(findTransaction === null || findTransaction === void 0 ? void 0 : findTransaction.returnDate, 'yyyy-MM-dd HH:mm:ss'));
        const now = new Date((0, date_fns_1.lightFormat)(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        const difference = Math.floor((0, date_fns_1.differenceInHours)(now, returnDate) / 24);
        let fine = 0;
        if (difference > 0) {
            fine = difference * 5000;
        }
        yield connection_1.prisma.transaction.update({
            where: {
                id: parseInt(idTransaction)
            },
            data: {
                fine
            }
        });
        res.status(201).send({
            error: false,
            message: 'Transaction Complete!',
            data: {
                fine
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.returnTransaction = returnTransaction;
