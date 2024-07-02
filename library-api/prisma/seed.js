const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const libraryBranches = [
    {
        name: 'Library GOP-09',
        location: 'BSD', 
        phoneNumber: '081334581242', 
        email: 'librarygop09@gmail.com'
    },
    {
        name: 'Library MSIG Tower',
        location: 'Jakarta Pusat', 
        phoneNumber: '08294912120', 
        email: 'librarymsigtower@gmail.com'
    }
]

const staffs = [
    [
        {
            name: "M. Defryan",
            email: "defryan@gmail.com",
            password: "abc12345", 
            phoneNumber: "081335719893",
            position: "HEAD_OFFICE"
        },
        {
            name: "Desmond",
            email: "desmond@gmail.com",
            password: "abc12345", 
            phoneNumber: "081220223011",
            position: "HELPER"
        }
    ],
    [
        {
            name: "Aboy",
            email: "aboy@gmail.com",
            password: "abc12345", 
            phoneNumber: "087822114019",
            position: "HEAD_OFFICE"
        },
        {
            name: "Desmond",
            email: "desmond@gmail.com",
            password: "abc12345", 
            phoneNumber: "085213162000",
            position: "HELPER"
        }
    ]
]

const staffSchedules = [
    [
        {
            clockIn: new Date("2024-07-01 09:00:00"),
            clockOut: new Date("2024-07-01 15:00:00"),
        },
        {
            clockIn: new Date("2024-07-01 15:00:00"),
            clockOut: new Date("2024-07-01 21:00:00"), 
        }
    ],
    [
        {
            clockIn: new Date("2024-07-01 09:00:00"),
            clockOut: new Date("2024-07-01 15:00:00"),
        },
        {
            clockIn: new Date("2024-07-01 15:00:00"),
            clockOut: new Date("2024-07-01 21:00:00"), 
        }
    ]
]

async function main(){
    // libraryBranches.forEach(async(item) => {
    //     const result = await prisma.libraryBranch.create({
    //         data: item
    //     })
    //     console.log(result)
    // })

    // staffs.forEach(async(item) => {
    //     const result = await prisma.staff.create({
    //         data: item
    //     })
    // })

    // staffSchedules.forEach(async(item) => {
    //     const result = await prisma.staffSchedule.create({
    //         data: item
    //     })
    // })

    libraryBranches.forEach(async(item, index) => {
        const result = await prisma.libraryBranch.create({
            data: item
        })

        staffs[index].forEach(async(item, idx) => {
            const res = await prisma.staff.create({
                data: {...item, libraryBranchId: result.id}
            })

            await prisma.staffSchedule.create({
                data: {
                    ...staffSchedules[index][idx],
                    staffUid: res.uid
                }
            })
        })
    })
}

main().catch((error) => {
    console.log(error)
}).finally(async() => {
    await prisma.$disconnect()
})