import jwt from 'jsonwebtoken';

export const createToken = ({userId, role}: any) => {
    return jwt.sign({userId, role}, 'jcwd2802', {algorithm: 'HS256'})
}