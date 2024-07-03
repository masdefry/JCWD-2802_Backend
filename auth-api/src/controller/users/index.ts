import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';

export const findUserProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, role} = req.body
       
        const findUser = await prisma.users.findFirst({
            where: {
                id: userId
            }, 
            select: {
                username: true, email: true, role: true
            }
        })
        
        res.status(200).send({
            error: true, 
            message: 'Get Profile Success!', 
            data: findUser
        })
    } catch (error) {
        next(error)
    }
}