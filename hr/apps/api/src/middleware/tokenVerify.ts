import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const tokenVerify = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {authorization} = req.headers

        if(!authorization) throw { message: 'Unauthorized!', status: 401 }

        const {userRole, userId}:any = jwt.verify(authorization?.split(' ')[1], 'hrapi2802')

        req.body.userRole = userRole 
        req.body.userId = userId

        next()
    } catch (error) {
        next(error)
    }
}