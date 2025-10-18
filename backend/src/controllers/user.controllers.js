import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.models.js";

//googleClientId
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generateAccessAndRefreshToken
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wronge when genrate access or refresh token"
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, fullname } = req.body;

  if (!username || !email || !fullname || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = await User.findOne({ email });
  if (existUser) throw new ApiError(401, "User already exist");

  const user = await User.create({
    fullname,
    email,
    username,
    password,
    avatar: `https://api.dicebear.com/9.x/initials/png?seed=${fullname}`,
    fcmToken: "",
  });

  if (!user) throw new ApiError(404, "User not created");

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "User registered succesfully"));
});


export {
    userRegister
}