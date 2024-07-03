import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {authorization} = req.headers
        
        if(!authorization) throw { message: 'User Not Authorized!', status: 401 }

        const decodedToken = jwt.verify(authorization?.split(' ')[1], 'jcwd2802')
        
        req.body = decodedToken

        next()
    } catch (error) {
        next(error)
    }
}