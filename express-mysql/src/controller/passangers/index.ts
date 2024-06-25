import {Request, Response} from 'express';
import db from '../../connection';
import util from 'util';

const query: any = util.promisify(db.query).bind(db)

export const GetAllPassangers = async(req: Request, res: Response) => {
    try {
        const findAllPassangers = await query('SELECT * FROM passangers');

        await query('...')
        
        res.status(200).send({
            error: false, 
            message: 'Get All Passangers Success!', 
            data: findAllPassangers
        })
    } catch (error) {
        console.log(error)
    }
}