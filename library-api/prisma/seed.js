import { prisma } from './../src/connection/index';

const staffs = [
    {
        name: "M. Defryan",
        email: "defryan@gmail.com",
        password: "abc12345", 
        phoneNumber: "0813121212121",
        position: "HELPER"
    },
    {
        name: "Desmond",
        email: "desmond@gmail.com",
        password: "abc12345", 
        phoneNumber: "0813121212121",
        position: "HELPER"
    }
]

async function main(){
    staffs.forEach(async(item) => {
        await prisma.staff.create({
            data: item
        })
    })
}

main().catch((error) => {
    console.log(error)
}).finally(async() => {
    await prisma.$disconnect()
})