import { Router } from "express";
import { GetAllPassangers } from "../controller/passangers";

const router = Router()

router.get('/', GetAllPassangers)

export default router;