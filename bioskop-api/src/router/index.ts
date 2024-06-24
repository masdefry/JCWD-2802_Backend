// Layer Architecture 02
import { Router } from "express";

const router = Router()

import AuthRouter from './AuthRouter';

router.use('/auth', AuthRouter)

export default router;