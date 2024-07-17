import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routers';

const app: Express = express();
app.use(express.json()) // [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(cors())

const port: number = 5000;

app.get('/', (req: Request, res: Response) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Auth API</h1>')
})

app.use(router);

// Centralized Error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send({
        error: true, 
        message: error.message || 'Something Went Wrong!', 
        data: {}
    })
})

app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`)
})