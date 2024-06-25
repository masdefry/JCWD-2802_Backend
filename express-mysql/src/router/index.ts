import { Router } from "express";
import PassangersRouter from './PassangersRouter';

const router = Router()

router.use('/passangers', PassangersRouter)

export default router;