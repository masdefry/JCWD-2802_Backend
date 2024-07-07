const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const hashPassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
}

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
        shiftId: 15, 
        positionId: 31
    },
    {
        firstName: 'Sangalabror',
        lastName: 'Putra', 
        email: 'aboy@gmail.com',
        password: 'abc12345',
        role: 'HR',
        shiftId: 16, 
        positionId: 31
    },
]

async function main(){
    // shifts.forEach(async(item) => {
    //     await prisma.shift.create({
    //         data: item
    //     })
    // })

    // positions.forEach(async(item) => {
    //     await prisma.position.create({
    //         data: item
    //     })
    // })

    users.forEach(async(item) => {
        await prisma.user.create({
            data: {
                ...item, 
                password: await hashPassword(item.password)
            }
        })
    })
}

main().catch((error) => {
    console.log(error)
}).finally(async() => {
    await prisma.$disconnect()
})



// npx prisma db push --force-reset && npx prisma db push && npx prisma db seed