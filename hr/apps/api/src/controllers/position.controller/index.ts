import { NextFunction, Request, Response } from 'express';
import { prisma } from '@/connection';

export const findAllPositions = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const positions = await prisma.position.findMany()

        res.status(200).send({
            error: false, 
            message: 'Get Positions Success',
            data: positions
        })
    } catch (error) {
        next(error)
    }
}