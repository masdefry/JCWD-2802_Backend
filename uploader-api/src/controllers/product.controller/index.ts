import { NextFunction, Request, Response } from 'express';
import { createProductService } from '../../services/product/create-product.service';

import fs from 'fs';

export const createProduct = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, price} = JSON.parse(req.body.product);

        if(!req.files) throw { message: 'Image is required', status: 400 }

        const files = Array.isArray(req.files)? req.files : req?.files?.products;

        await createProductService({
            name, 
            price, 
            files
        })

        res.status(201).send({
            error: false, 
            message: 'Create Product Success', 
            data: {}
        })
    } catch (error) {
        const files = Array.isArray(req.files)? req.files : req?.files?.products;
        
        files?.forEach((item: Express.Multer.File) => {
            fs.rmSync(item.path)
        })

        next(error)
    }
}