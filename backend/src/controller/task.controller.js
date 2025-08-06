
import { ApiError } from "../utils/Api-error.js";
import { ApiResponse } from "../utils/Api-response.js";
import { AsyncHandeler } from "../utils/async-handeler.js";
import logger from "../utils/logger.js";
import User from "../model/user.model.js"
import Task from "../model/Task.model.js";

export const CreateTask=AsyncHandeler(async(req,res)=>{
    const {title,discription,duedate,Priority}=req.body
    if(!Priority){
        Priority="LOW"
    }
    if(!title||!discription||!duedate){
        logger.warn("please fill the reqire fields")
        throw new ApiError(404,"please fill all fields")
    }
    const existask=await Task.findOne({title:title.toLowerCase().trim()})
    if(existask){
        logger.warn("task is already exist")
    }
    const task=await Task.create({
         title:title.trim,
        discription,
        duedate,
        Priority,
        status,
        taskaddesby:req.user._id
    }
       

    )
    res.status(200).json(
        200,
        task,
        {message:"task created succesfully"}
    )
})
export const getallTask=AsyncHandeler(async(req,res)=>{
    const books=await Task.find().populate("taskaddesby","name email ")
     res.status(200).json(new ApiResponse(200,books,{message:"we fetch all books"}))

})
export const getbookByname=AsyncHandeler(async(req,res)=>{
    const {title}=req.quary
    if(!title){
        logger.warn("we want the book name")

    }
    const task=await Task.findOne({title:title.toLowerCase().trim()}).populate("taskaddesby","name email ")
    if(!task){
        logger.error("cant find any task")
        throw new ApiError(404,"cant find any task")
    }
    res.status(200).json(new ApiResponse(200,task,{message:"fetch the book succesfully"}))
})
export const updateTask=AsyncHandeler(async(req,res)=>{
   const {title,discription,duedate,Priority}=req.body
    if(!Priority){
        Priority="LOW"
    }
    const task=await Task.findOneAndUpdate({title:title.toLowerCase().trim()},
                                            {title:title.trim(),
        discription,
        duedate,
        Priority,
        status,
        taskaddesby:req.user._id},{ new: true, runValidators: true })
    res.status(200).json(new ApiResponse(200,task,{message:"update task succesfully"}))

})
export const updateTaskByid=AsyncHandeler(async(req,res)=>{
    const{id}=req.quary
    if(!id){
        throw new ApiError(404,"cant find any valid id")

    }
    const {title,discription,duedate,Priority}=req.body
     if(!Priority){
        Priority="LOW"
    }
    const updateTask=await Task.findByIdAndUpdate(id,{
        title,
        discription,
        Priority,
        duedate,
        status:updateTask.status

    })
    res.status(200).json(new ApiResponse(200,updateTask,{message:"task updated successfully"}))
})
export const deleteTask=AsyncHandeler(async(req,res)=>{
    const {title}= req.body
    if(!title){
        logger.error("title is require")
        throw new ApiError(404,"tile not found")
    }
    const task=await Task.findOne({title})
    if(!task){
        throw new ApiError(404,"cant find any task")
    }
    await task.deleteOne()
    res.status(200).json(new ApiResponse(200,{message:"task deleted successfully"}))
})
