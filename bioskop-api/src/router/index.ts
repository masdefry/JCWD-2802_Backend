// Layer Architecture 02
import { Router } from "express";

const router = Router()

import AuthRouter from './AuthRouter';
import MovieRouter from './MovieRouter';

router.use('/auth', AuthRouter)
router.use('/movies', MovieRouter)

export default router;