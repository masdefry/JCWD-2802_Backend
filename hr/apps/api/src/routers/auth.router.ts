import { Router } from 'express';
const router = Router()
import { authenticationUser, registerStaff, keepAuthenticationUser, verificationUser } from '@/controllers/auth.controller';

// Middleware 
import { authValidation } from '@/middleware/validation/auth.validation.middleware';
import { tokenVerify } from '@/middleware/token-verify.middleware';
import { authorizeHR } from '@/middleware/role-verify.middleware';

router.post('/', authValidation, authenticationUser) // /auth/
router.post('/register-staff', tokenVerify, authorizeHR, registerStaff) // /auth/register-staff
router.get('/', tokenVerify, keepAuthenticationUser)
router.patch('/', tokenVerify, verificationUser)

export default router;