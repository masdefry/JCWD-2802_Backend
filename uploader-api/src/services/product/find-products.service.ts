import { prisma } from '../../connection';

export const findProductsService = async() => {
    const products = await prisma.product.findMany({
        include: {
            product_images: true
        }
    })

    return products
}