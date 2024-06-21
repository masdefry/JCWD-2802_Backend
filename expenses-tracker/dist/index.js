"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileSystem_1 = require("./utils/fileSystem");
const app = (0, express_1.default)();
// [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(express_1.default.json());
const port = 5000;
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express Typescript Server</h1>');
});
app.post('/expenses', (req, res) => {
    // Step-01 Get Data from Request
    // Step-02 Read Data from `db.json`
    // Step-03 Add New Data 
    // Step-04 Write Data to `db.json`
    // Step-05 Send Response
    try {
        // 01
        const { title, nominal, type, category, date } = req.body;
        if (!title || !nominal || !type || !category || !date) {
            throw new Error('Data Must be Complete!');
        }
        // 02 Data Isi Keseluruhan dari `db.json`
        const data = (0, fileSystem_1.readFileSync)();
        // 03 Push Data dari `req.body` kedalam Data Expenses
        data.expenses.push({ id: Date.now(), title, nominal, type, category, date });
        // 04 
        // fs.writeFileSync('./db/db.json', JSON.stringify(data))
        (0, fileSystem_1.writeFileSync)(data);
        // 05
        res.status(201).send({
            error: false,
            message: 'Create Expense Success!'
        });
    }
    catch (error) {
        // error: { message: 'Data Must be Complete!' }
        res.status(500).send({
            error: true,
            message: error.message
        });
    }
});
app.get('/expenses/:id', (req, res) => {
    try {
        const { id } = req.params; // {id: xxx}
        const data = (0, fileSystem_1.readFileSync)();
        const expenseDetail = data.expenses.filter((item) => item.id === parseInt(id));
        if (expenseDetail.length === 0)
            throw { status: 404, message: 'Expense Not Found!' };
        res.status(200).send({
            error: false,
            message: 'Get Expense Detail Success!',
            data: expenseDetail
        });
    }
    catch (error) { // error: {status: 404, message: 'Expense Not Found!'}
        const status = error.status;
        res.status(status || 500).send({
            error: true,
            message: error.message
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
