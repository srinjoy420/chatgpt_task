import winstone from "winston"
import path from "path"
const {colorize,timestamp,combine,printf}=winstone.format
const logDir=path.resolve('logs')
const logformat=printf(({message,level,timestamp})=>{
    return `${level},${message},${timestamp}`
})
const logger = winstone.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logformat
  ),
  transports:[
    new winstone.transports.Console(),
     new winstone.transports.File({ filename: `${logDir}/error.log`, level: 'error'}),
    new winstone.transports.File({ filename: `${logDir}/combined.log` }),
  ]
  
});
export default logger