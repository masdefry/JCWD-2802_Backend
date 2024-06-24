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
        const { status, date, time } = req.query;
        // Step-01 Read Data from db.json
        const { movies, transactions } = JSON.parse(fs_1.default.readFileSync('./src/db/db.json', 'utf-8'));
        if (!status && !date && !time)
            return res.status(200).send({
                error: false,
                message: 'Get All Movies Success',
                data: movies
            });
        if (status) {
            const moviesByStatus = movies.filter((item) => {
                return item.status === status.split('%').join(' ').toUpperCase();
            });
            return res.status(200).send({
                error: false,
                message: 'Get Movies by Status Success',
                data: moviesByStatus
            });
        }
        if (date && time) {
            const moviesOnShowing = movies.filter((item) => {
                return item.status === 'ON SHOWING';
            });
            moviesOnShowing.forEach((mov) => {
                let totalBookSeat = 0;
                transactions.forEach((trans) => {
                    if (mov.id === trans.movies_id) {
                        if (date === trans.date && time === trans.time) {
                            totalBookSeat += trans.total_seat;
                        }
                    }
                });
                mov.seat_available = mov.total_seat - totalBookSeat;
            });
            res.status(200).send({
                error: false,
                message: 'Get Movies by Date & Time Success',
                data: moviesOnShowing
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetMovies = GetMovies;
