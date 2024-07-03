import { NextFunction, Request, Response } from "express";

export const validationAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        if(!email || !password) throw { message: 'Email & Password Must be Filled!', status: 400 }
        
        next()
    } catch (error) {
        next(error)
    }
}