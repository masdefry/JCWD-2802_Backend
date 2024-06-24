import { Request, Response } from "express"
import fs from 'fs';

export const GetMovies = async(req: Request, res: Response) => {
    try {
        const {status, date, time} = req.query

        // Step-01 Read Data from db.json
        const {movies, transactions} = JSON.parse(fs.readFileSync('./src/db/db.json', 'utf-8'))

        if(!status && !date && !time) return res.status(200).send({
                error: false, 
                message: 'Get All Movies Success', 
                data: movies
            })
        if(status){
            const moviesByStatus = movies.filter((item: any) => {
                return item.status === status.split('%').join(' ').toUpperCase()
            })
            
            return res.status(200).send({
                error: false, 
                message: 'Get Movies by Status Success', 
                data: moviesByStatus
            })
        }

        if(date && time){
            const moviesOnShowing = movies.filter((item: any) => {
                return item.status === 'ON SHOWING'
            })
          
            moviesOnShowing.forEach((mov: any) => {
                let totalBookSeat = 0
                transactions.forEach((trans: any) => {
                    if(mov.id === trans.movies_id){
                        if(date === trans.date && time === trans.time){
                           totalBookSeat += trans.total_seat
                        }
                    }
                })
                mov.seat_available = mov.total_seat - totalBookSeat
            })

            res.status(200).send({
                error: false, 
                message: 'Get Movies by Date & Time Success', 
                data: moviesOnShowing
            })
        }


    } catch (error) {
        console.log(error)
    }
}
