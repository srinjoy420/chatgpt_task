
import { validationResult } from "express-validator";
import {ApiError} from "../utils/Api-error.js"

export const Validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedError=[]
    errors.array().map((err)=>extractedError.push({
        [err.path]:err.msg
    }))
    throw new ApiError(422,"recived data is not valid",extractedError)

}