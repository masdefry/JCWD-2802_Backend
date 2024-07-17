import { IProduct } from './types';
import { prisma } from '../../connection';

interface IProductImages extends IProduct{
    files: Express.Multer.File[]
}

export const createProductService = async({ name, price, files }: IProductImages) => {
    const createdProduct = await prisma.product.create({
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
    files.forEach(async(item: any) => {
       productImage.push({ url: item.filename, productId: createdProduct.id })
    })
    await prisma.productImage.createMany({
        data: productImage
    })
}