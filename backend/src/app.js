import express from "express"
import cookieparser from "cookie-parser"

// import routes
import helchCheckRoutes from "./routes/helthCheck.routes.js"
import authRoutes from "./routes/auth.routes.js"
import taskroutes from "./routes/task.routes.js"

const app=express()
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// the apps
app.use("/api/v1/helchCheck",helchCheckRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/task",taskroutes)
export default app

