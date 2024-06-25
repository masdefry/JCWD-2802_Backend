import {Request, Response} from 'express';
import db from '../../connection';
import util from 'util';

const query: any = util.promisify(db.query).bind(db)

export const GetPassangers = async(req: Request, res: Response) => {
    try {
        const {PassangerName, Survived, Sex, Pclass} = req.query
        
        let findPassangers
    
        if(PassangerName){
            findPassangers = await query(`SELECT * FROM passangers WHERE Name LIKE "%${PassangerName}%"`)
        }else if(Survived && Sex){
            findPassangers = await query(`SELECT * FROM passangers WHERE Survived=${Survived} AND Sex="${Sex}"`)
        }else if(Survived && Pclass){
            findPassangers = await query(`SELECT * FROM passangers WHERE Survived=${Survived} AND Pclass = ${Pclass}`)
        }else{
            findPassangers = await query('SELECT * FROM passangers');
        }

        return res.status(200).send({
            error: false, 
            message: 'Get All Passangers Success!', 
            data: findPassangers
        })
    } catch (error) {
        console.log(error)
    }
}