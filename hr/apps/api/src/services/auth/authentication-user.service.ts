import {prisma} from '../../connection';
import { IUser } from './types';

export const authenticationUserService = async({ email }: Pick<IUser, 'email'>) => {
    return await prisma.user.findFirst({
        where: {
            AND: [
                {email: email}
            ]
        }, 
        include: {
            shift: true, 
            position: true
        }
    })
}