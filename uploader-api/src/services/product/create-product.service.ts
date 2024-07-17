import { IProduct } from './types';
import { prisma } from '../../connection';

interface IProductImages extends IProduct{
    files: Express.Multer.File[]
}

export const createProductService = async({ name, price, files }: IProductImages) => {
    await prisma.$transaction(async(tx) => {
        const createdProduct = await tx.product.create({
            data: {
                name, 
                price: parseInt(price)
            }
        })
    
        /*
        files.forEach(async(item: any) => {
            await prisma.productImage.create({
                data: {
                    url: item.filename, 
                    productId: createdProduct.id
                }
            })
        })
        */
    
        const productImage: any = []
        files.forEach(async(item: Express.Multer.File) => {
           productImage.push({ url: item.path, productId: createdProduct.id })
        })
        await tx.productImage.createMany({
            data: productImage
        })
    })
}