import { NextFunction, Request, Response } from 'express';
import { prisma } from '@/connection';
import { lightFormat } from 'date-fns';

export const findAllShifts = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const shifts = await prisma.shift.findMany()
        
        shifts.forEach((item: any) => {
            item.startTime = lightFormat(new Date(item.startTime), 'HH:mm')
            item.endTime = lightFormat(new Date(item.endTime), 'HH:mm')
        })

        res.status(200).send({
            error: false, 
            message: 'Get Shifts Success!',
            data: shifts
        })
    } catch (error) {
        next(error)
    }
}