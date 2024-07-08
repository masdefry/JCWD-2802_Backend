import { Router } from 'express';
const router = Router() 

import { findAllShifts } from '@/controllers/sift.controller';

router.get('/', findAllShifts)

export default router;