import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    businessEmail,
    companyName,
    password,
    confirmPassword,
  } = req.body;

  const userExists = await User.findOne({ businessEmail });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    businessEmail,
    companyName,
    password: hashedPassword,
    confirmPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      businessEmail: user.businessEmail,
      companyName: user.companyName,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { businessEmail, password } = req.body;

  const user = await User.findOne({ businessEmail });

  if (!user) {
    res.status(404);
    throw new Error("User does not exists");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      businessEmail: user.businessEmail,
      companyName: user.companyName,
    });
  } else {
    res.status(401);
    throw new Error("Password does not match");
  }
});

// const getAllUsers = asyncHandler(async (req, res) => {
//   // Fetch all users from the database
//   const users = await User.find();

//   // Send the list of users in the response
//   res.json(users);
// });
export { registerUser, userLogin };
