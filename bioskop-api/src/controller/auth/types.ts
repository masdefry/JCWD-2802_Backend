type TRole = 'USER' | 'ADMIN'

export interface IUser{
    uid: number, 
    email: string, 
    username: string, 
    password: string, 
    role: TRole 
}