import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        
        const findUser = await prisma.users.findFirst({
            where: {
                AND: [
                    {
                        email, password
                    }
                ]
            }
        })
        
        if(findUser === null) throw { message: 'Authentication Failed! Email & Password Doesnt Match!', status: 401 }

        res.status(200).send({
            error: false, 
            message: 'Authentication Success!', 
            data: {}
        })
    } catch (error) {
        next(error)
    }
}