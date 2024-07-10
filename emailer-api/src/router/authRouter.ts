import { Router } from 'express';
const router = Router()
import { authenticate, register } from '../controller/auth';
import { exampleMiddleware } from '../middleware/example';
import { validationAuth } from '../middleware/validationAuth';

router.post('/', exampleMiddleware, exampleMiddleware, validationAuth, authenticate)
router.post('/register', register);

export default router;