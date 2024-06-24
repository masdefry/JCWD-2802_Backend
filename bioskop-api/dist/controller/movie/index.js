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
exports.GetMovies = void 0;
const fs_1 = __importDefault(require("fs"));
const GetMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step-01 Read Data from db.json
        const { movies } = JSON.parse(fs_1.default.readFileSync('./src/db/db.json', 'utf-8'));
        // Step-02 Send Response
        res.status(200).send({
            error: false,
            message: 'Get All Movies Success',
            data: movies
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetMovies = GetMovies;
