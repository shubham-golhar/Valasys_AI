import express from "express";
import { registerUser, userLogin } from "../controller/User.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);

// userRouter.get("/", getAllUsers);

export default userRouter;
