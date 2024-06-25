import { Router } from "express";
import { GetPassangers } from "../controller/passangers";

const router = Router()

router.get('/', GetPassangers)

export default router;