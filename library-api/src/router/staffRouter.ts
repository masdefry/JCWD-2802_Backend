import { Router } from 'express';
const router = Router()
import { auth, createMember } from '../controller/staff';

router.post('/auth', auth);
router.post('/register-member', createMember)

export default router;