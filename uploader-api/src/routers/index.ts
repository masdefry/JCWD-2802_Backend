import express, { Router } from 'express';
const router = Router()
import productRouter from './product.router';
router.use('*/Images', express.static('src/public/Images'))

router.use('/products', productRouter)

export default router;