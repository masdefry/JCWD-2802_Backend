import { Router } from 'express';
const router = Router()
import { auth, registerStaff, keepAuth } from '@/controllers/auth.controller';

// Middleware 
import { authValidation } from '@/middleware/validation/auth.validation';
import { tokenVerify } from '@/middleware/tokenVerify';
import { authorizeHR } from '@/middleware/roleVerify';

router.post('/', authValidation, auth) // /auth/
router.post('/register-staff', tokenVerify, authorizeHR, registerStaff) // /auth/register-staff
router.get('/keep', tokenVerify, keepAuth)

export default router;