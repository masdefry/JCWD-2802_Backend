import { Request, Response, NextFunction } from 'express';
import {prisma} from '../../connection';
import { comparePassword, hashPassword } from '@/helper/hashPassword';
import { createToken } from '@/helper/createToken';
import { find } from '@reduxjs/toolkit/dist/utils';

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body 

        const findUser = await prisma.user.findFirst({
            where: {
                AND: [
                    {email: username}
                ]
            }, 
            include: {
                shift: true, 
                position: true
            }
        })
        console.log(findUser)
        if(findUser === null) throw { message: 'Username & Password Doesnt Match', status: 401 }
        
        const isPasswordMatch = await comparePassword(password, findUser.password)
        
        if(isPasswordMatch === false) throw { message: 'Password Doesnt Match!', status: 401 }

        const token = createToken({userId: findUser.id, userRole: findUser.role})

        res.status(200).send({
            error: false, 
            message: 'Authentication Success!', 
            data: {
                token, 
                firstName: findUser.firstName, 
                lastName: findUser.lastName,
                email: findUser.email,
                role: findUser.role, 
                shift: {
                    startTime: findUser.shift.startTime, 
                    endTime: findUser.shift.endTime 
                },
                position: findUser.position.name
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerStaff = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {firstName, lastName, email, password, role, position, shift} = req.body
     
        const findUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(findUser) throw { message: 'Email Already Register', status: 400 }

        const findPosition = await prisma.position.findFirst({
            where: {
                id: parseInt(position)
            }
        })

        if((role === 'HR' && findPosition?.name !== 'HR') 
            || 
        (role === 'STAFF' && findPosition?.name === 'HR')) throw { message: 'Invalid Position', status: 400 }
        
        await prisma.user.create({
            data: {
                firstName, 
                lastName, 
                email, 
                password: await hashPassword(password), 
                role, 
                positionId: parseInt(position), 
                shiftId: parseInt(shift)
            }
        })

        res.status(201).send({
            error: false, 
            message: 'Create Staff Success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}