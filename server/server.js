import express from 'express';
import "dotenv/config"
import authRouter from './route/auth.route.js';
import { connectDB } from './config/db.js';
const app = express();
app.use(express.json()) //to parse the incomming requests  with JSON Playloads (from req.body)
const port = process.env.PORT || 3000;



//endPoint
app.use("/api/auth",authRouter)

app.get("/",(req, res) =>{
    res.send("first")
})
app.listen(port, (req,res)=>{
    console.log("port start on " + port);
    connectDB()
})