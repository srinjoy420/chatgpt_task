import {ApiError} from "../utils/Api-error.js"
import {ApiResponse} from "../utils/Api-response.js"
import logger from "../utils/logger.js"
export const healthcheck=async(req,res)=>{
    try {
        res.status(200).json(new ApiResponse(200,{message:"server is running"}))
    } catch (error) {
        logger.error("something happen",error)
        
    }
    

}