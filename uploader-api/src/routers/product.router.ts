import { Router } from 'express';
const router = Router()
import { createProduct } from '../controllers/product';
import { uploader } from '../middlewares/uploader.middleware';

router.post('/', uploader('IMG', 'Images', ['png', 'jpg', 'jpeg'], 1000000).fields([{ name: 'products', maxCount: 3 }]), createProduct);

export default router;