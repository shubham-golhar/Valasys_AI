import express from "express";
import { generateOtp } from "../controller/SentOtp";
const otpRouter = express.Router();

otpRouter.post("/generate-otp", generateOtp);

export default otpRouter;
