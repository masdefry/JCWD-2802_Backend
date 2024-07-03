import { Router } from 'express';
const router = Router()
import authRouter from './authRouter';
import userRouter from './userRouter';

router.use('/auth', authRouter)
router.use('/user', userRouter)

export default router;