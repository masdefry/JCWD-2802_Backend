import { NextFunction, Request, Response } from 'express';

export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('exampleMiddleware Executed!')
    // Pengecekan Role User
    next()
}