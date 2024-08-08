import express from "express";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
const messageRouter = express.Router();

messageRouter.get("/:id", protectRoute, getMessage)
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter