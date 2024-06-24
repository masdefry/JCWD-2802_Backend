import { Router } from 'express';

const router = Router()

import * as MovieController from '../controller/movie';

router.get('/', MovieController.GetMovies)

export default router
