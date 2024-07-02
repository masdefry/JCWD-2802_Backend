import { Router } from 'express';
const router = Router()
import { auth, createMember, createBook, createTransaction, returnTransaction } from '../controller/staff';

router.post('/auth', auth);
router.post('/register-member', createMember)
router.post('/register-book', createBook)
router.post('/transaction', createTransaction)
router.patch('/return-transaction/:idTransaction', returnTransaction)

export default router;