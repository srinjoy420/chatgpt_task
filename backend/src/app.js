import express from "express"
import cookieparser from "cookie-parser"
const app=express()
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
export default app

