import { PrismaClient } from '@prisma/client';
const prisma = PrismaClient()

const shifts = [
    {
        id: 1, 
        name: 'Morning',
        startTime: '0000-00-00 09:00:00',
        endTime: '0000-00-00 18:00:00'
    },
    {
        id: 2, 
        name: 'Night',
        startTime: '0000-00-00 13:00:00',
        endTime: '0000-00-00 21:00:00'
    }
]

const positions = [
    {
        id: 1, 
        name: 'HR', 
        salary: 10000000
    },
    {
        id: 2, 
        name: 'MANAGER', 
        salary: 250000000
    },
    {
        id: 3, 
        name: 'PRODUCT_MANAGER', 
        salary: 17500000
    },
    {
        id: 4, 
        name: 'PROGRAMMER', 
        salary: 15000000
    }
]

const users = [
    {
        firstName: 'Immanuel',
        lastName: 'Janis', 
        email: 'immanuel@gmail.com',
        password: 'abc12345',
        role: 'HR',
        shiftId: 1, 
        positionId: 1
    },
    {
        firstName: 'Sangalabror',
        lastName: 'Putra', 
        email: 'aboy@gmail.com',
        password: 'abc12345',
        role: 'HR',
        shiftId: 2, 
        positionId: 1
    },
]

function main(){
    shifts.forEach(async(item) => {
        await prisma.shifts.create({
            data: item
        })
    })

    positions.forEach(async(item) => {
        await prisma.positions.create({
            data: item
        })
    })

    users.forEach(async(item) => {
        await prisma.users.create({
            data: item
        })
    })
}

main().catch((error) => {
    console.log(error)
}).finally(async() => {
    await prisma.$disconnect()
})