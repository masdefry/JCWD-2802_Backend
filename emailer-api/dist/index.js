"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use((0, cors_1.default)());
const port = 5000;
app.get('/', (req, res) => {
    // Req: Digunakan Untuk Mengambil Resource dari Client
    // Res: Digunakan Untuk Mengirim Response Menuju Client
    res.send('<h1>Welcome to Auth API</h1>');
});
app.use(router_1.default);
// Centralized Error
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: true,
        message: error.message || 'Something Went Wrong!',
        data: {}
    });
});
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
