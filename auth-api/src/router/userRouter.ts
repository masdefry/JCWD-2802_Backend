import { Router } from 'express';
const router = Router()

import { findUserProfile } from '../controller/users';

import { jwtVerify } from '../middleware/jwtVerify';

router.get('/', jwtVerify, findUserProfile)

export default router;