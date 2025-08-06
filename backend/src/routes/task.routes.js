import {Router} from "express"

import {isLoggdin,isadmin} from "../middleware/auth.middleware.js"
import { CreateTask, deleteTask, getallTask, getbookByname, updateTaskByid } from "../controller/task.controller.js"

const router=Router()

 router.post("/createtask",isLoggdin,CreateTask)
router.get("/alltask",isLoggdin,getallTask)
router.get("/fidbyname",isLoggdin,getbookByname)
router.put("/updatetask/:id",isLoggdin,isadmin,updateTaskByid)

router.delete("/delete",isLoggdin,isadmin,deleteTask)




export default router