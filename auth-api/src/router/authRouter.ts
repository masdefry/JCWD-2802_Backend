import { Router } from 'express';
const router = Router()
import { authenticate } from '../controller/auth';
import { exampleMiddleware } from '../middleware/example';
import { validationAuth } from '../middleware/validationAuth';

router.post('/', exampleMiddleware, exampleMiddleware, validationAuth, authenticate)

export default router;