import { Router } from 'express';
const router = Router()
import authRouter from './auth.router';
import shiftRouter from './shift.router';
import positionRouter from './position.router';

router.use('/auth', authRouter)
router.use('/shifts', shiftRouter)
router.use('/positions', positionRouter)

export default router;