import logger from "../utils/logger.js"
import { ApiError } from "../utils/Api-error.js"
import {ApiResponse} from "../utils/Api-response.js"
import { AsyncHandeler } from "../utils/async-handeler.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const isLoggdin=AsyncHandeler(async(req,res,next)=>{
    const token=req.cookies?.AcessToken
    logger.info("token found",token?"yes":"no")
    if(!token){
        logger.error("cant find any token")
        throw new ApiError(404,"cant find any token")
    }
    const decoded=jwt.verify(token,process.env.TOKEN_SECRET)
    req.user=decoded
    
})
// to check the role of user is admin or not
export const isadmin=AsyncHandeler(async(req,res,next)=>{
    const userid=req.user?._id
    const role=req.role?._role
    if(!userid || !role=="admoin"){
        logger.warn("you are not admin or the userid is not valid")
        res.status(404).json(new ApiResponse(
            403,
            {success:false},
            {message:"you are not validate "}

        ))
    }
})