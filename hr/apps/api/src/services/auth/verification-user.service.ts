import { prisma } from '@/connection';
import { IUser } from './types';
import { hashPassword } from '@/helper/hash-password.helper';

export const verificationUserService = async({ id, password }: Pick<IUser, 'id' | 'password'>) => {
    const findUser = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!findUser) throw { message: 'User Not Found', status: 404 }

    await prisma.user.update({
        where: {
            id
        },
        data: {
            password: await hashPassword(password), 
            isVerified: true
        }
    })
}