import express from 'express';
import "dotenv/config"
import authRouter from './route/auth.route.js';
import { connectDB } from './config/db.js';
import messageRouter from './route/messageRouter.js';
import cookieParser from 'cookie-parser';
import userRouter from './route/userRouter.js';
import cors from 'cors'


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()) //to parse the incomming requests  with JSON Playloads (from req.body)
app.use(cookieParser())
app.use(cors())



//endPoint
app.use("/api/auth",authRouter)
app.use("/api/messages",messageRouter)
app.use("/api/users",userRouter)

app.get("/",(req, res) =>{
    res.send("first")
})
app.listen(port, (req,res)=>{
    connectDB()
    console.log("port start on " + port);
})