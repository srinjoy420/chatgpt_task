import mongoose,{Schema} from "mongoose";
import {AvaroleEnum,userRoleEnum} from "../utils/constants.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto"
dotenv.config()
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
         unique:true,
    },
    password:{
        type:String,
        required:[true,"password is require"]
    },
    role:{
        type:String,
        enum:AvaroleEnum,
        default:userRoleEnum.MEMBER
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    emailVerificationToken:{
        type:String
    },
    emailVerificationexpiry:{
        type:Date 
    },
    forgotpasswordToken:{
        type:String
    },
    forgotpasswordExpiry:{
        type:Date
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

// hash password
userSchema.pre('save',async function next() {
    if(!this.isModified(this.password) )return next();
    this.password=await bcrypt.hash(this.password,10)
    next()

    
})
//compare password
userSchema.method.ispasswordCorrect=async function (password) {
    await bcrypt.compare(password,this.password)
    
}
// generate accessToken
userSchema.method.generateAcessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
            role:this.role
        },
        process.env.TOKEN_SECRET,
        {expiresIn:process.env.TOKEN_EXPIRY}

    )
}
//generate refereshToken
userSchema.method.gererateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
            role:this.role
        },
        process.env.TOKEN_SECRET,
        {expiresIn:process.env.TOKEN_EXPIRY}

    )

}
//email verification token
userSchema.method.emailverificatioonTokren=function(){
    const unhasedToken=crypto.randomBytes(32).toString("hex")
    const hashedToken=crypto.createHash("sha256").toUpdate(unhasedToken).digest("hex")
    const tokenExpiry=new Date(Date.now()+20*60*1000)
    return {unhasedToken,hashedToken,tokenExpiry}
}
const User=mongoose.model("User",userSchema)
export default User