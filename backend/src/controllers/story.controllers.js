import mongoose from "mongoose";
import { Story } from "../models/story.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createStory = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const storyLocalPath = req.file?.path;

  if (storyLocalPath) {
    throw new ApiError(404, "Please add video or image");
  }

  const storyUploaded = await uploadOnCloudinary(storyLocalPath);
  if (!storyUploaded.secure_url) {
    throw new ApiError(400, "Avatar Image not update try again");
  }

  const story = await Story.create({
    storyFile: {
      url: storyUploaded.secure_url,
      public_id: storyUploaded.public_id,
    },
    owner: req.user._id,
    caption,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  if (story) {
    throw new ApiError(400, "Story added failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, story, "story added successfully"));
});

// get user story
const getUserStories = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const stories = await Story.aggregate([
    {
      $match: {
        owner: userId,
        expiresAt: { $gt: new Date() },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "views",
        foreignField: "_id",
        as: "viewers",
        pipeline: [
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        viewersCount: {
          $size: "$viewers",
        },
      },
    },
  ]);
  if (!stories) {
    throw new ApiError(404, "Your Story fetched failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, stories, "Video Fetched successfully"));
});

export { createStory, getUserStories };
