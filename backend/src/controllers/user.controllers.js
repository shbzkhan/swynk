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

// user register
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

// login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, fcmToken } = req.body;

  if (!email) {
    throw new ApiError(400, "email are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Invalid user credantials");
  }

  const validatePassword = await user.isPasswrodCorrect(password);

  if (!validatePassword) {
    throw new ApiError(401, "Invalid user credantials");
  }

  if (fcmToken && user.fcmToken !== fcmToken) {
    user.fcmToken = fcmToken;
    await user.save({ validateBeforeSave: false });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken -watchHistory"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loginUser, accessToken, refreshToken },
        "User logged In"
      )
    );
});

//google login
const googleLogin = asyncHandler(async (req, res) => {
  const { idToken, fcmToken } = req.body;
  if (!idToken) {
    throw new ApiError(400, "id-token is required");
  }
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  if (!ticket) {
    throw new ApiError(400, "Error ticket, Please try again later");
  }

  const payload = ticket.getPayload();
  if (!payload) {
    throw new ApiError(400, "Error payload, Please try again later");
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const username = payload.email.split("@")[0];
    user = await User.create({
      googleId: payload.sub,
      fullname: payload.name,
      email: payload.email,
      avatar: payload.picture,
      username,
      fcmToken,
    });
  } else {
    if (fcmToken && user.fcmToken !== fcmToken) {
      user.fcmToken = fcmToken;
      await user.save({ validateBeforeSave: false });
    }
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken -watchHistory"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loginUser, accessToken, refreshToken },
        "User logged In"
      )
    );
});

//logout controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

//refereh access token controller
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  console.log("incoming token hear", incomingToken);
  if (!incomingToken) {
    throw new ApiError(401, "Refresh token not found");
  }
  const decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);

  if (!decoded) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findById(decoded?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  if (incomingToken !== user.refreshToken) {
    throw new ApiError(401, "Unauthorized, token not matched");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  console.log("new Refresh Token", refreshToken);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        203,
        {
          accessToken,
          refreshToken,
        },
        "Access Token Refreshed"
      )
    );
});

//current user controller
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, { new: true }));
});

export { 
  userRegister, 
  loginUser, 
  googleLogin, 
  logoutUser, 
  refreshAccessToken,
  getCurrentUser
};
