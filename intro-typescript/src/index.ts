// VARIABLE 
type TCampus = string;
let campus: TCampus = 'BSD'
campus = 'PWD'

type TAddress = string;
let address: TAddress = 'GOP-09'

let phoneNumber: number | string | undefined = 62812
phoneNumber = '0812'
phoneNumber = undefined 



// ARRAY & OBJECT
// Array Biasa  : Array yang Memiliki Item dengan Tipe Data yang Sama
const alphabets: string[] = ['a', 'b', 'c']
alphabets.push(1)

// Array Tupple : Array yang Memiliki Item dengan Tipe Data yang Berbeda2
const data: [boolean, string, number, number] = [true, 'abc', 100, 1000]

// Object
type TStudent = {
    id: number, 
    name: string, 
    address: string, 
    isGraduated: boolean
}

const student: TStudent = {
    id: 1, 
    name: 'Aboy', 
    address: 'Bintaro', 
    isGraduated: false
}

student.isMaried = true



// FUNCTION
// Function with Return
function Print(): string{
    return 'Hello'
}

// Function without Return
function Call(): void{
    console.log('Hello')
}

// Function with Parameter(s)
function PrintOut(user: string, hobby: string){
    return `Hello, ${user}. My Hobby is ${hobby}`
}

PrintOut('Defryan', 'Ngoding')

type TShowProfile = {
    name: string, 
    address: string
}

function ShowProfile({name, address}: TShowProfile){
    console.log(name)
    console.log(address)
}

ShowProfile({
    name: 'Immanuel', 
    address: 'BSD'
})







let bebas: any = 10
bebas = 'abc'
bebas = true 
bebas = undefined

// ARRAY of OBJECT 
/*
    const students = [
        {
            id: 1, 
            name: 'Kiki', 
            address: 'Bogor'
        }
    ]
*/

type TObjStudent = {
    id: number, 
    name: string, 
    address: string 
}

const students: TObjStudent[] = [
    {
        id: 1, 
        name: 'Yuke', 
        address: 'Pamulang'
    }
]



// Type vs Interface 
// Type Lebih Sering digunakan untuk Mendefinisikan Function
// Interface Lebih Sering digunakan untuk Mendefinisikan Object/Class

//                              Type vs Interface
//  Object                  :    OK         OK
//  Merge                   :    x          OK
//  Intersection & Union    :    OK         x
//  Extend                  :    x          OK

// >>> Dapat digunakan u/ Object
type TFilm = {
    id: number, 
    name: string, 
    release: number 
}

interface IFilm{
    id: number, 
    name: string,
    release: number
}

const film: IFilm = {
    id: 1, 
    name: 'Naruto', 
    release: 2002
}

film.bebas = 'abc'

// >>> Merge
type TSong = {
    songName: string 
}

type TSong = {
    artistName: string
}

interface ISong{
    songName: string 
}

interface ISong{
    artistName: string
} 

const song: ISong = {
    songName: 'Balonku', 
    artistName: 'Bebas',
}

// >>> Intersection & Union 
type TPropA = {
    id: number, 
    propA: string 
}

type TPropB = {
    id: number, 
    propsB: string
}

const objRandom: TPropA & TPropB = {
    id: 1,
    propA: 'A', 
    propsB: 'B'
}

const objRandom1: TPropA | TPropB = {
    id: 1, 
    propA: 'A'
}



// >>> Extend : Penjabaran Real Project