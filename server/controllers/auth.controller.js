import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { sendUserDetailOnMail } from "../utils/email.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!(name || email || password || role)) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering the user",
    });
  } else {
    try {
      await sendUserDetailOnMail(user);
    } catch (error) {
      console.error("ERROR :: while sending details on email:", error);
    }
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.status(400);
    throw new Error("Email and password are required for signin");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = user.generateUserToken();

  const options = { httpOnly: true, secure: true };

  return res
    .cookie("userAccessToken", token, options)
    .status(200)
    .json({
      success: true,
      message: "User logged in successfully",
      userAccessToken: token,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { new: true });

  const options = { httpOnly: true, secure: true };

  return res.clearCookie("userAccessToken", options).status(200).json({
    success: true,
    message: "User logged out successfully",
    data: {},
  });
});

export { register, login, logout };
