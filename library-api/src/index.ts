import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './router';

const app: Express = express();
app.use(express.json()) // [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(cors())

const port: number = 5000;

app.get('/', (req: Request, res: Response) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Tracker Expenses API</h1>')
})

app.use(router);

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})