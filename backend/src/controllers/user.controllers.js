import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.models.js";
import { generateOTP } from "../utils/otpGenerator.js";
import { mailSender } from "../utils/nodemailer.js";
import { Otp } from "../models/Otp.models.js";
import { PendingUser } from "../models/PendingUser.models.js";

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

//send otp
const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new ApiError(400, "Email already registered");
  }

  const otp = generateOTP();
  if (!otp) {
    throw new ApiError(400, "otp send failed");
  }

  await Otp.findOneAndUpdate(
    { email },
    {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    },
    {
      upsert: true,
      new: true,
    }
  );
  //send otp to user email
  await mailSender(otp, email);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP send successfully"));
});

//verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  if (!email || !otp) throw new ApiError(400, "Email or OTP are required");

  const existOtp = await Otp.findOne({ email });

  if (!existOtp) throw new ApiError(404, "OTP not found");

  if (Date.now() > existOtp.expiresAt.getTime()) {
    await Otp.deleteOne({ email });
    throw new ApiError(401, "OTP expired");
  }

  const validateOtp = await existOtp.isOtpCorrect(otp);

  if (!validateOtp) throw new ApiError(401, "Invalid OTP");

  await Otp.deleteOne({ email });

  await PendingUser.findOneAndUpdate(
    { email },
    {
      verified: true,
      verifiedAt: Date.now(),
    },
    {
      upsert: true,
      new: true,
    }
  );

  const otpToken = jwt.sign(
    { email, verified: true },
    process.env.OTP_TOKEN_SECRET,
    { expiresIn: process.env.OTP_TOKEN_EXPIRY }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, otpToken, "OTP verified successfully"));
});

// user register
const userRegister = asyncHandler(async (req, res) => {
  const { username, otpToken, password, fullname } = req.body;

  if (!username || !otpToken || !fullname || !password) {
    throw new ApiError(400, "All fields are required");
  }

  let payload = jwt.verify(otpToken, process.env.OTP_TOKEN_SECRET);
  if (!payload) {
    throw new ApiError(401, "Unauthorized");
  }
  const email = payload.email;
  if (!email) throw new ApiError(400, "Invalid token payload");

  const pendingUser = await PendingUser.findOne({ email });
  if (!pendingUser || !pendingUser.verified) {
    throw new ApiError(400, "Email not verified");
  }

  const existUser = await User.findOne({ email });
  if (existUser) throw new ApiError(401, "User already exist");

  let avatar;
  const avatarLocalPath = req.file?.path;
  if (avatarLocalPath) {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.secure_url) {
      throw new ApiError(400, "Avatar Image not update try again");
    }
  }
  let user;
  if (avatarLocalPath) {
    await User.create({
      fullname,
      email,
      username,
      password,
      avatar: {
        url: avatar.secure_url,
      },
      fcmToken: "",
    });
  } else {
    user = await User.create({
      fullname,
      email,
      username,
      password,
      avatar: {
        url: `https://api.dicebear.com/9.x/initials/png?seed=${fullname}`,
      },
      fcmToken: "",
    });
  }

  if (!user) throw new ApiError(404, "User not created");

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered succesfully"));
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
    "-password -refreshToken"
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
    "-password -refreshToken"
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

const searchUser = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query } = req.query;
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const searchedUsersAggregate = User.aggregate([
    {
      $search: {
        index: "search-users",
        compound: {
          should: [
            {
              autocomplete: {
                query,
                path: "username",
              },
            },
            {
              autocomplete: {
                query,
                path: "fullname",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        _id: { $ne: userId }
      }
    },
    {
      $lookup: {
        from: "conversations",
        let: { searchedUser: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: [userId, "$participants"] },
                  { $in: ["$$searchedUser", "$participants"] },
                ],
              },
            },
          },
          {
            $project: {
              _id: 1
            },
          }
        ],
        as: "conversation"
      },
    },
    {
      $lookup: {
        from: "requests",
        let: { searchedUserId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $or: [
                      {
                        $eq: ["$sender", userId]
                      }, {
                        $eq: ["$sender", '$$searchedUserId']
                      }
                    ]
                  },
                  {
                    $or: [
                      {
                        $eq: ["$receiver", userId]
                      }, {
                        $eq: ["$receiver", '$$searchedUserId']
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            $project: {
              sender: 1,
              receiver: 1
            }
          }
        ],
        as: "request"
      }
    },
    {
      $addFields: {
        conversation: {
          $first: "$conversation"
        },
        hasConversation: {
          $cond: [{ $gt: [{ $size: "$conversation" }, 0] }, true, false],
        },
        request: {
          $first: "$request"
        },
        hasRequest: {
          $gt: [{ $size: "$request" }, 0]
        }
      }
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        avatar: 1,
        conversation: 1,
        hasConversation: 1,
        hasRequest: 1,
        request: 1
      }
    }
  ]);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
  const searchedUsers = await User.aggregatePaginate(searchedUsersAggregate, options)

  return res
    .status(200)
    .json(new ApiResponse(200, searchedUsers, "users find successfully"));
});

export {
  sendOtp,
  verifyOtp,
  userRegister,
  loginUser,
  googleLogin,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  searchUser
};
