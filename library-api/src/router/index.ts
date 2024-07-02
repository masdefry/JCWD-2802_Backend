import { Router } from 'express';
const router = Router()
import staffRouter from './staffRouter';

router.use('/staff', staffRouter)

export default router;