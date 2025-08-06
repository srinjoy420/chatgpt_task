import {Router} from "express"
import { registerUser,loginUser,logoutuser} from "../controller/auth.controller.js"
import { Validate } from "../middleware/validator.middleware.js"
import { userRegistrationValidator,userLoginValidator } from "../validators/indexValidator.js"
import { isLoggdin } from "../middleware/auth.middleware.js"


const router=Router()
router.post("/register",userRegistrationValidator(),Validate,registerUser)
router.post("/login",userLoginValidator(),Validate,loginUser)
router.get("/logout",isLoggdin,Validate,logoutuser)

export default router