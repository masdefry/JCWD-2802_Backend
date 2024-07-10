const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'masdefry20@gmail.com',
        pass: 'bjkljnmwdapwlwda'
    },
    tls: {
        rejectUnauthorized: false
    }
})