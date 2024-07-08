import { Router } from 'express';
const router = Router()
import { auth, registerStaff } from '@/controllers/auth.controller';

// Middleware 
import { authValidation } from '@/middleware/validation/auth.validation';

router.post('/', authValidation, auth) // /auth/
router.post('/register-staff', registerStaff) // /auth/register-staff

export default router;