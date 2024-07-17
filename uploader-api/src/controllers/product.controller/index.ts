import { NextFunction, Request, Response } from 'express';
import { createProductService } from '../../services/product/create-product.service';

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
    } catch (error) {
        next(error)
    }
}