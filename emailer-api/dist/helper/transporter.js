"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'masdefry20@gmail.com',
        pass: 'bjkljnmwdapwlwda'
    },
    tls: {
        rejectUnauthorized: false
    }
});
