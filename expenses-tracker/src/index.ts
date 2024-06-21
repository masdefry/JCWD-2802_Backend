import express, { Express, Request, Response } from 'express';
import { readFileSync, writeFileSync } from './utils/fileSystem';
import { IExpenses } from './types';
import { IError } from './types';

const app: Express = express();
// [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(express.json())
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

app.post('/expenses', (req: Request, res: Response) => {
  // Step-01 Get Data from Request
  // Step-02 Read Data from `db.json`
  // Step-03 Add New Data 
  // Step-04 Write Data to `db.json`
  // Step-05 Send Response
  try {
    // 01
    const {title, nominal, type, category, date} = req.body

    if(!title || !nominal || !type || !category || !date){
      throw new Error('Data Must be Complete!')
    }

    // 02 Data Isi Keseluruhan dari `db.json`
    const data = readFileSync()
    
    // 03 Push Data dari `req.body` kedalam Data Expenses
    data.expenses.push(
      {id: Date.now(), title, nominal, type, category, date}
    )

    // 04 
    // fs.writeFileSync('./db/db.json', JSON.stringify(data))
    writeFileSync(data)

    // 05
    res.status(201).send({
      error: false, 
      message: 'Create Expense Success!'
    })
  } catch (error) {
    // error: { message: 'Data Must be Complete!' }
    res.status(500).send({
      error: true, 
      message: (error as IError).message
    })
  }
})

app.get('/expenses/:id', (req: Request, res: Response) => {
  try {
    const {id} = req.params// {id: xxx}

    const data = readFileSync()

    const expenseDetail = data.expenses.filter((item: IExpenses) => item.id === parseInt(id))

    if(expenseDetail.length === 0) throw {status: 404, message: 'Expense Not Found!'}

    res.status(200).send({
      error: false, 
      message: 'Get Expense Detail Success!', 
      data: expenseDetail
    })
  } catch (error) { // error: {status: 404, message: 'Expense Not Found!'}
    const status: number = (error as IError).status
    res.status(status || 500).send({
      error: true, 
      message: (error as Error).message
    })
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});