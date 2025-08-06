import mongoose,{Schema} from "mongoose";
import {TaskEnum,Tasks} from "../utils/constants.js"
import {Priority,PriorityEnum} from "../utils/constants.js"

const taskSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    status:{
        type:String,
        enum:Tasks,
        default:TaskEnum.DUE
    },
    Priority:{
        type:String,
        enum:Priority,
        required:true
        

    },
    duedate:{
        type:Date,
        required:true
    },
    taskaddesby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


},{timestamps:true})
const Task=mongoose.model("TASK",taskSchema)
export default Task