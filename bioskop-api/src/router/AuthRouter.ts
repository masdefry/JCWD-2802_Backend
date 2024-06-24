// Layer Architecture 03
import { Router } from 'express';

const router = Router()

import * as AuthController from '../controller/auth/AuthController';

router.post('/register', AuthController.RegisterUser)
router.get('/auth', AuthController.LoginUser)

export default router

