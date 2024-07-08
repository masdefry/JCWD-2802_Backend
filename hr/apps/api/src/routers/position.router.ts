import Router from 'express';
const router = Router();
import { findAllPositions } from '@/controllers/position.controller';

router.get('/', findAllPositions)

export default router;