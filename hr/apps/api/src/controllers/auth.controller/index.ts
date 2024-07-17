import { Request, Response, NextFunction } from 'express';
import { comparePassword } from '@/helper/hash-password.helper';
import { createToken } from '@/helper/create-token.helper';
import { transporter } from '@/helper/transporter.helper';
import { compileHtml } from '@/helper/compile-html.helper';

// SERVICES
import { authenticationUserService } from '@/services/auth/authentication-user.service';
import { registerStaffService } from '@/services/auth/register-staff.service';
import { keepAuthenticationUserService } from '@/services/auth/keep-authentication-user.service';
import { verificationUserService } from '@/services/auth/verification-user.service';

export const authenticationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body 

        const findUser = await authenticationUserService({ email: username })

        if(findUser === null) throw { message: 'Username & Password Doesnt Match', status: 401 }
        
        const isPasswordMatch = await comparePassword(password, findUser.password)
        
        if(isPasswordMatch === false) throw { message: 'Password Doesnt Match!', status: 401 }

        if(findUser.isVerified === false) throw { message: 'User Not Verified! Verify Your Account First!', status: 401 }

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
     
        const createdUser = await registerStaffService({ email, positionId: position, role, firstName, lastName, password, shiftId: shift })
        
        // role didapat dari req.body
        // createdUser.id didapat ketika proses create prisma.user nya berhasil
        const token = createToken({userId: createdUser.id, userRole: role})

        const compiledTemplate = compileHtml({ token, firstName: createdUser.firstName })

        await transporter.sendMail({
            to: email, 
            subject: 'Welcome to Our Company', 
            html: compiledTemplate
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

export const keepAuthenticationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.body 

        const findUser = await keepAuthenticationUserService({ id: userId })

        if(findUser === null) throw { message: 'Unauthorized!', status: 401 }

        res.status(200).send({
            error: false, 
            message: 'Authentication Success!', 
            data: {
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

export const verificationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, userId } = req.body

        await verificationUserService({ id: userId, password })

        res.status(201).send({
            error: false, 
            message: 'Verification & Update Password Success', 
            data: {}
        })
    } catch (error) {
        next(error)
    }
}