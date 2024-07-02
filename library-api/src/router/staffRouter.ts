import { Router } from 'express';
const router = Router()
import { auth, createMember, createBook, createTransaction } from '../controller/staff';

router.post('/auth', auth);
router.post('/register-member', createMember)
router.post('/register-book', createBook)
router.post('/transaction', createTransaction)

export default router;