const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const users = [
    {
        username: 'ryandefryan',
        email: 'ryan01@gmail.com',
        password: 'abc12345', 
        role: 'USER'
    }
]

function main(){
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