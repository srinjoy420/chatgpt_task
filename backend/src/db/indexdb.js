import mongoose from "mongoose"
import dotenv from "dotenv"
import logger from "../utils/logger.js"
dotenv.config()

const ConnectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("database connected succesfully")
    } catch (error) {
        logger.error("could connect to database",error)
        process.exit(1)
    }
}
export default ConnectDb