"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSync = exports.readFileSync = void 0;
const fs_1 = __importDefault(require("fs"));
const readFileSync = () => {
    return JSON.parse(fs_1.default.readFileSync('./db/db.json', 'utf-8'));
};
exports.readFileSync = readFileSync;
const writeFileSync = (data) => {
    fs_1.default.writeFileSync('./db/db.json', JSON.stringify(data));
};
exports.writeFileSync = writeFileSync;
