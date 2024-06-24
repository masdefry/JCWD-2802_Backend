import { Request, Response } from "express"
import fs from 'fs';

export const GetMovies = async(req: Request, res: Response) => {
    try {
        // Step-01 Read Data from db.json
        const {movies} = JSON.parse(fs.readFileSync('./src/db/db.json', 'utf-8'))

        // Step-02 Send Response
        res.status(200).send({
            error: false, 
            message: 'Get All Movies Success', 
            data: movies
        })
    } catch (error) {
        console.log(error)
    }
}