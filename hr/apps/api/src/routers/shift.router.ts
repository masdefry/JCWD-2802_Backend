import { Router } from 'express';
const router = Router() 

import { findAllShifts } from '@/controllers/shift.controller';

router.get('/', findAllShifts)

export default router;