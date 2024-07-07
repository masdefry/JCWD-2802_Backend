import { Router } from 'express';
const router = Router()
import { auth } from '@/controllers/auth.controller';

// Middleware 
import { authValidation } from '@/middleware/validation/auth.validation';

router.post('/', authValidation, auth)

export default router;