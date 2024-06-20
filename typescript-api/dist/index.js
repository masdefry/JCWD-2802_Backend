"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Library FS (File System): Untuk Membaca File
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
// [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(express_1.default.json());
const port = 5000;
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express Typescript Server</h1>');
});
app.get('/test', (req, res) => {
    res.send('Hello');
});
app.get('/users', (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync('./db/db.json', 'utf-8'));
    res.send({
        data: data.users
    });
});
app.post('/users', (req, res) => {
    const newUser = req.body;
    // Step-01 Read Data di `db.json`
    const data = JSON.parse(fs_1.default.readFileSync('./db/db.json', 'utf8'));
    // data.users = [{}]
    let isEmailRegistered = false;
    data.users.forEach((item) => {
        if (item.email === newUser.email)
            isEmailRegistered = true;
    });
    if (isEmailRegistered) {
        return res.send({
            message: 'Email Already in Use',
            data: null
        });
    }
    // Step-02 Data dari `db.json` dimanupulasi dengan Menambahkan `newUser` dari `req.body`
    data.users.push(newUser);
    // Step-03 Data yang sudah dimanipulasi, disimpan kembali ke `db.json`
    fs_1.default.writeFileSync('./db/db.json', JSON.stringify(data));
    // Step-04 Response
    res.send({
        message: 'Create User Success!',
        data: null
    });
});
// PUT    : Harus Mengirimkan Semua Datanya
// PATCH  : Mengirimkan Data yang Akan di Update Saja
// username, email, password
app.put('/users/:emailId', (req, res) => {
    // Step-00 Get Request Data
    const { emailId } = req.params;
    const { username, password, email } = req.body;
    // Step-01 Read Data JSON
    const data = JSON.parse(fs_1.default.readFileSync('./db/db.json', 'utf8'));
    console.log(data);
    // Step-02 Match Data dari `req.body` dengan Data dari `db.json`
    data.users.forEach((item) => {
        // Step-03 Update Data
        if (item.email === emailId) {
            item.password = password;
            item.username = username;
        }
    });
    // Step-04 Write Data JSON
    fs_1.default.writeFileSync('./db/db.json', JSON.stringify(data));
    // Step-05 Send Response
    res.send({
        message: 'Update Profile Success!',
        data: null
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
