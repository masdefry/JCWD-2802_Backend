import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { createToken } from '../../helper/jwt';
import {transporter} from '../../helper/transporter';

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

export const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, role } = req.body
        
        // Find Email on Database: prisma.user.findMany

        // Email Exist, Throw Error: If(findUser) throw Error

        // Insert Register User into Table: prisma.user.create

        // Send Email Verification
        await transporter.sendMail({
            to: email, 
            subject: 'Email Verification', 
            html: '<h1>Welcome as New User!</h1> <p>To activate your account, clik link below: </p><h1>Link Verification</h1>'
        })

        // Send Response
        res.status(201).send({
            error: false, 
            message: 'Register Success!', 
            data: {}
        })
    } catch (error) {
        next(error)
    }
}