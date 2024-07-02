import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { isAfter, isBefore, lightFormat } from 'date-fns';

export const auth = async(req: Request, res: Response, next: NextFunction) => {
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
        next(error)
    }
}

export const createMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, address, phoneNumber, birthDate} = req.body 
        
        await prisma.member.create({
            data: {username, address, phoneNumber, birthDate: new Date(birthDate)}
        })

        res.status(201).send({
            error: false, 
            message: 'Create Member Success!', 
            data: {}
        })
    } catch (error: any) {
        next(error)
    }
}

export const createBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {title, author, publishYear, genre, isbn, branch_id}= req.body

        const createdBook = await prisma.book.create({
            data: {
                title, 
                author, 
                publishYear: new Date(publishYear), 
                genre, 
                isbn
            }
        })
        

        const distributedBooks: any = []
        branch_id.forEach((item: any) => {
            distributedBooks.push({bookId: createdBook.id, libraryBranchId: item})
        })
        
        await prisma.libraryBranchBook.createMany({
            data: distributedBooks
        })

        res.status(201).send({
            error: false, 
            message: 'Create Book Success!', 
            data: {}
        })
    } catch (error) {
        next(error)
    }
}