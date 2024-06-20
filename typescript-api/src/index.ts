import express, { Express, Request, Response } from 'express';
// Library FS (File System): Untuk Membaca File
import fs from 'fs';

const app: Express = express();
// [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(express.json())
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello')
})

app.get('/users', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
  res.send(
    {
      data: data.users
    }
  )
})

app.post('/users', (req: Request, res: Response) => {
  const newUser = req.body

  // Step-01 Read Data di `db.json`
  const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  
  // data.users = [{}]
  let isEmailRegistered: boolean = false
  interface IUser{
    username: string, 
    password: string, 
    email: string
  }
  data.users.forEach((item: IUser) => {
    if(item.email === newUser.email) isEmailRegistered = true
  })
  if(isEmailRegistered){
    
    return res.send({
      message: 'Email Already in Use', 
      data: null
    })
    
  }

  // Step-02 Data dari `db.json` dimanupulasi dengan Menambahkan `newUser` dari `req.body`
  data.users.push(newUser)

  // Step-03 Data yang sudah dimanipulasi, disimpan kembali ke `db.json`
  fs.writeFileSync('./db/db.json', JSON.stringify(data))

  // Step-04 Response
  res.send({
    message: 'Create User Success!', 
    data: null
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});