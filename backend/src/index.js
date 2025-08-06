import app from "./app.js"
import logger from "./utils/logger.js"
import ConnectDb from "./db/indexdb.js"

import dotenv from "dotenv"
dotenv.config()
const port=process.env.PORT || 3001

ConnectDb()
    .then(()=>{
        app.listen(port,()=>logger.info("server running on",port))
    })
    .catch((err)=>{
        logger.error("please check a cant connect to  database ",err)
        process.exit(1)
    })

