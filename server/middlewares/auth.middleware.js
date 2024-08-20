import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.userAccessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401);
      throw new Error("No token provided. Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      res.status(403);
      throw new Error("Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({
      success: false,
      message: error.message || "Invalid access token",
    });
  }
});

export const verifyUserRole = (roles) => {
  return asyncHandler(async (req, res, next) => {
    await verifyJWT(req, res, () => {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "Access denied. Unauthorized request",
        });
      }
    });
  });
};
