"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = ({ userId, role }) => {
    return jsonwebtoken_1.default.sign({ userId, role }, 'jcwd2802', { algorithm: 'HS256' });
};
exports.createToken = createToken;
