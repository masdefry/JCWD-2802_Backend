import { prisma } from '@/connection'
import { IUser } from './types'

export const keepAuthenticationUserService = async({ id }: Pick<IUser, 'id'>) => {
    return await prisma.user.findFirst({
        where: {
            id
        }, 
        include: {
            shift: true, 
            position: true
        }
    })
}