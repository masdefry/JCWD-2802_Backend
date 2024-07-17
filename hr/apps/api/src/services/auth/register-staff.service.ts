import {prisma} from '../../connection';
import { IUser } from './types';
import { hashPassword } from '@/helper/hash-password.helper';

export const registerStaffService = async({ email, positionId, role, firstName, lastName, password, shiftId }: IUser) => {
    const findUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(findUser) throw { message: 'Email Already Register', status: 400 }

    const findPosition = await prisma.position.findFirst({
        where: {
            id: positionId
        }
    })

    if((role === 'HR' && findPosition?.name !== 'HR') 
        || 
    (role === 'STAFF' && findPosition?.name === 'HR')) throw { message: 'Invalid Position', status: 400 }

    return await prisma.user.create({
        data: {
            firstName, 
            lastName, 
            email, 
            password: await hashPassword(password), 
            role, 
            positionId, 
            shiftId
        }
    })
}