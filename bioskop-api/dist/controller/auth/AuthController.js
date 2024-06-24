"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const fs_1 = __importDefault(require("fs"));
// Layer Architecture 04
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step-01 Get Data from `req.body` 
        // Step-02 Create Interface
        // Step-03 Read `db.json`
        // Step-04 Validation
        // Step-05 Create UID
        // Step-06 Add Data from `req.body`
        // Step-07 Write New Data 
        // Step-08 Send Response
        const { email, username, password } = req.body;
        const data = JSON.parse(fs_1.default.readFileSync('./src/db/db.json', 'utf-8'));
        data.users.forEach((item, index) => {
            if (item.username === username)
                throw { status: 400, message: 'Username Already Exist!' };
            if (item.email === email)
                throw { status: 400, message: 'Email Already Exist!' };
        });
        data.users.push({ email, username, password });
        fs_1.default.writeFileSync('./src/db/db.json', JSON.stringify(data));
        res.status(201).send({
            error: false,
            message: 'Register Success',
            data: {}
        });
    }
    catch (error) {
        res.status(error.status || 500).send({
            error: true,
            message: error.message,
            data: {}
        });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.LoginUser = LoginUser;
