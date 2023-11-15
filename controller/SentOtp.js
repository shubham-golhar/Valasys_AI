const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
// In-memory storage for OTPs (you might want to use a database in a production environment)

// Nodemailer configuration (replace with your email credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Generate and send OTP
const generateOtp = asyncHandler(async (req, res) => {
  const { businessEmail } = req.body;

  // Generate a new OTP
  const otp = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
  });

  const getUser = await User.findOne({ businessEmail: businessEmail });
  let jsonData = {
    otp: otp,
  };

  if (getUser) {
    let saveOtp = await User.updateOne(
      { _id: getUser._id },
      { $set: jsonData }
    );
    console.log("saveOtp", saveOtp);

    if (saveOtp) {
      // Send the OTP via email
      const mailOptions = {
        from: process.env.EMAIL,
        to: businessEmail,
        subject: "OTP Verification",
        text: `Your OTP for verification is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          return res.status(500).json({ error: "Failed to send OTP" });
        }
        res.status(200).json({ message: "OTP sent successfully" });
      });
    }
  }
});

export { generateOtp };
