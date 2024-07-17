export interface IUser{
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role; 
    isVerified?: boolean;
    shiftId: number;
    positionId: number; 
    createdAt?: Date;
    updatedAt?: Date; 
    deletedAt?: Date;
}

enum Role{
    STAFF = "STAFF",
    HR = "HR"
}