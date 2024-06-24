import { Request, Response } from "express"
import { IUser } from "./types"
import { IError } from "../types";
import fs from 'fs';

// Layer Architecture 04

export const RegisterUser = async(req: Request, res: Response) => {
    try {
        // Step-01 Get Data from `req.body` 
        // Step-02 Create Interface
        // Step-03 Read `db.json`
        // Step-04 Validation
        // Step-05 Create UID
        // Step-06 Add Data from `req.body`
        // Step-07 Write New Data 
        // Step-08 Send Response
        const {email, username, password} = req.body
        
        const data = JSON.parse(fs.readFileSync('./src/db/db.json', 'utf-8'))
        
        data.users.forEach((item: IUser, index: number) => {
            if(item.username === username) throw {status: 400, message: 'Username Already Exist!'}
            if(item.email === email) throw {status: 400, message: 'Email Already Exist!'}
        })

        data.users.push({email, username, password})

        fs.writeFileSync('./src/db/db.json', JSON.stringify(data))

        res.status(201).send({
            error: false, 
            message: 'Register Success', 
            data: {}
        })
    } catch (error) {
        res.status((error as IError).status || 500).send({
            error: true, 
            message: (error as IError).message, 
            data: {}
        })
    }
}

export const LoginUser = async() => {
    try {
        
    } catch (error) {
        
    }
}