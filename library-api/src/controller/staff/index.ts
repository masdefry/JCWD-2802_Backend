import { Request, Response } from 'express';
import { prisma } from '../../connection';
import { isAfter, isBefore, lightFormat } from 'date-fns';

export const auth = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body 
        
        const findStaff = await prisma.staff.findFirst({
            where: {
                AND: [
                    {
                        email, 
                        password
                    }
                ]
            }
        })
        console.log(findStaff)
        if(findStaff === null) throw { message: 'Login Failed! Username & Password Doesnt Match!', status: 401 }

        const {clockIn, clockOut}: any = await prisma.staffSchedule.findFirst({
            where: {
                staffUid: findStaff.uid
            }
        })

        const isClockIn = isAfter((lightFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')), (`${lightFormat(new Date(), 'yyyy-MM-dd')} ${lightFormat(new Date(clockIn), 'HH:mm:ss')}`))
        const isClockOut = isBefore((lightFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')), (`${lightFormat(new Date(), 'yyyy-MM-dd')} ${lightFormat(new Date(clockOut), 'HH:mm:ss')}`))

        if(!isClockIn || !isClockOut) throw { message: 'You Are Not in Shift Time!', status: 401 }

        res.status(200).send({
            error: false, 
            message: 'Login Success!', 
            data: {}
        })
    } catch (error: any) {
        res.status(error.status).send({
            error: true, 
            message: error.message, 
            data: {}
        })
    }
}