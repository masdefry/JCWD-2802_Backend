import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { isAfter, isBefore, lightFormat, addDays, differenceInHours } from 'date-fns';

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

export const createTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const{memberUid, staffUid, books} = req.body
        
        if(books.length > 3) throw { message: 'Book Qty is Over Limit!', status: 400 }

        const createdTransaction = await prisma.transaction.create({
            data: {
                borrowingDate: new Date(), 
                returnDate: addDays(new Date(), 5), 
                totalPrice: 0, 
                memberUid, 
                staffUid
            }
        })
        
        books.forEach(item => {
            item.transactionId = createdTransaction.id
        })
        await prisma.transactionDetail.createMany({
            data: books 
        })

        res.status(201).send({
            error: false, 
            message: 'Create Transaction Success!', 
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const returnTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {idTransaction} = req.params
        
        const findTransaction = await prisma.transaction.findFirst({
            where: {
                id: parseInt(idTransaction)
            }
        })

        if(!findTransaction) throw { message: 'Transaction Not Found!', status: 404 }
        if(findTransaction.fine !== null) throw { message: 'Transaction Has Been Completed!', status: 400 }
        const returnDate = new Date(lightFormat(findTransaction?.returnDate, 'yyyy-MM-dd HH:mm:ss'))
        const now = new Date(lightFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        const difference = Math.floor(differenceInHours(now, returnDate)/24)
        let fine = 0
        if(difference > 0){
            fine = difference * 5000
        }

        await prisma.transaction.update({
            where: {
                id: parseInt(idTransaction)
            }, 
            data: {
                fine
            }
        })

        res.status(201).send({
            error: false, 
            message: 'Transaction Complete!', 
            data: {
                fine
            }
        })
    } catch (error) {
        next(error)
    }
}