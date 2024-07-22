import { Router } from 'express';
const router = Router()
import { createProduct, findProducts } from '../controllers/product.controller';
import { uploader } from '../middlewares/uploader.middleware';

router.post('/', uploader('IMG', 'Images', ['png', 'jpg', 'jpeg'], 1000000).fields([{ name: 'products', maxCount: 3 }]), createProduct);
router.get('/', findProducts)

export default router;