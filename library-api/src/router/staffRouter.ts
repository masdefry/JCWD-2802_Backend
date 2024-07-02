import { Router } from 'express';
const router = Router()
import { auth } from '../controller/staff';

router.post('/auth', auth);

export default router;