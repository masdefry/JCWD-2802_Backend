import { Router } from 'express';
const router = Router()
import { authenticate } from '../controller/auth';
import { exampleMiddleware } from '../middleware/example';

router.post('/', exampleMiddleware, exampleMiddleware, authenticate)

export default router;