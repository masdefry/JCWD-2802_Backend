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

// REAL IMPLEMENTATION TYPE & OBJECT

type TRam = 4 | 8 | 16 | 32 | 64

interface IProductLaptop{
    id: number, 
    name: string, 
    ram: TRam
}

const productLaptop: IProductLaptop = {
    id: 1, 
    name: 'Asus', 
    ram: 4
}

type TProgram = 'JCWD' | 'JCDM'

interface IStudentPwd{
    id: number, 
    name: string, 
    program: TProgram
}

const studentPwd = {
    id: 1, 
    name: 'Aboy', 
    program: 'JCDM'
}



// ADVANCE TYPE 
/*
    Partial     : Partial<T>
    Required    : Required<T>
    Readonly    : Readonly<T>
    Pick        : Pick<T, K>
    Omit        : Omit<T, K>
    Record      : Record<K, T>
    Extract     : Extract<T, U>
    Exclude     : Exclude<T, U>
*/
// Use Case: Kita Ingin Membuat Interface Baru dari Interface yang Sudah Ada Sebelumnya. 
//           Tapi Kita Tidak diperbolehkan Merubah/Memodifikasi Interface yang Sebelumnya. 
//           Kenapa Tidak Kita Ubah Saja Interface Sebelumnya? Karena Bisa Jadi Interfacenya
//           dari Library atau Framework atau Mungkin dari Codebase Kita yang Sebelumnya. 
//           Dan Apabila Merubah Codebase nya, Dapat Mempengaruhi Code2 Lainnya. 

// >>>>> Partial    : Membuat Interface Menjadi Opsional 

interface IObjCar{
    id: number, 
    name: string, 
    brand: string, 
    release: number 
}

const objCar: IObjCar = {
    id: 1, 
    name: 'Cretta', 
    brand: 'Hyundai', 
    release: 2022
}

const objCar1: Partial<IObjCar> = {
    id: 2, 
    name: 'Palisade',
}

// >>>>> Required   : Membuat Interface Menjadi Required

// >>>>> Readonly 
interface ISapa{
    name: string, 
    hobby: string
}

function Sapa(data: Readonly<ISapa>){
    // Error, Karena Props `name` Readonly (Tidak Boleh Diubah2)
    data.name = 'Abc'
    return `Hello, My Name is ${name}. My Hobby is ${hobby}`
}

Sapa({
    name: 'Aboy', 
    hobby: 'Futsal'
})

// >>>>> Pick 

interface ILecturer{
    id: number, 
    name: string, 
    address: string 
}

const objDataLecturer: Pick<ILecturer, 'id' | 'name'> = {
    id: 1, 
    name: 'Defryan',
}

// >>>>> Omit : Pengecualian
const objDataLecturer1: Omit<ILecturer, 'id'> = {
    name: 'Salam', 
    address: 'Pamulang'
}

