import express from 'express';
import { signupUser, loginUser, logOutUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signupUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logOutUser)

export default authRouter