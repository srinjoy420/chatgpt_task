import {Router} from "express"
import {healthcheck} from "../controller/helthcheck.controller.js"
const router=Router()
router.get("/helthCheck",healthcheck)

export default router