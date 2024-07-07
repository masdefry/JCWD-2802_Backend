import { Request, Response, NextFunction } from 'express';
import {prisma} from '../../connection';
import { comparePassword } from '@/helper/hashPassword';
import { createToken } from '@/helper/createToken';

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body 

        const findUser = await prisma.user.findFirst({
            where: {
                AND: [
                    {email: username}
                ]
            }
        })

        if(findUser === null) throw { message: 'Username & Password Doesnt Match', status: 401 }
        
        const isPasswordMatch = await comparePassword(password, findUser.password)
        
        if(isPasswordMatch === false) throw { message: 'Password Doesnt Match!', status: 401 }

        const token = createToken({userId: findUser.id, userRole: findUser.role})

        res.status(200).send({
            error: false, 
            message: 'Authentication Success!', 
            data: {
                token, 
                email: findUser.email,
                role: findUser.role
            }
        })
    } catch (error) {
        next(error)
    }
}