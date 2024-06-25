"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// [WAJIB!] Initialize Body Parser: Supaya Dapat Mengambil Request Data dari Body
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 5000;
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express Typescript Server</h1>');
});
const router_1 = __importDefault(require("./router"));
app.use(router_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
