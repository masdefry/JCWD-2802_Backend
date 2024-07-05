const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const shifts = [
    {
        name: 'Morning',
        startTime: new Date('2024-07-04 09:00:00'),
        endTime: new Date('2024-07-04 18:00:00')
    },
    {
        name: 'Night',
        startTime: new Date('2024-07-04 13:00:00'),
        endTime: new Date('2024-07-04 21:00:00')
    }
]

const positions = [
    {
        name: 'HR', 
        salary: 10000000
    },
    {
        name: 'MANAGER', 
        salary: 250000000
    },
    {
        name: 'PRODUCT_MANAGER', 
        salary: 17500000
    },
    {
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

async function main(){
    shifts.forEach(async(item) => {
        await prisma.shift.create({
            data: item
        })
    })

    positions.forEach(async(item) => {
        await prisma.position.create({
            data: item
        })
    })

    users.forEach(async(item) => {
        await prisma.user.create({
            data: item
        })
    })
}

main().catch((error) => {
    console.log(error)
}).finally(async() => {
    await prisma.$disconnect()
})