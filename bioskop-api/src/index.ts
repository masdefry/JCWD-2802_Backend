import express, { Express, Request, Response, Router } from 'express';

const app: Express = express();
// [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(express.json())
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

// Layer Architecture 01
// Import Router
import router from './router';

app.use(router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});