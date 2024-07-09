import { NextFunction, Request, Response } from 'express';

export const authorizeHR = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userRole} = req.body 

        if(userRole !== 'HR') throw { message: 'Unauthorized!', status: 401 }

        next()
    } catch (error) {
        next(error)
    }
}