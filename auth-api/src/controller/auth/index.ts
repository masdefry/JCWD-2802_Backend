import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { createToken } from '../../helper/jwt';

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

        const token = createToken({
            userId: findUser.id, 
            role: findUser.role
        })

        res.status(200).send({
            error: false, 
            message: 'Authentication Success!', 
            data: {
                token
            }
        })
    } catch (error) {
        next(error)
    }
}