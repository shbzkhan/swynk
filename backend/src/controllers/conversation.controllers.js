import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
const getUserConversation = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const participantsAggregate = Conversation.aggregate([
    {
      $match: {
        participants: userId,
      },
    },
    {
      $unwind: "$participants",
    },
    {
      $match: {
        participants: { $ne: userId },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "participants",
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
      $unwind: "$participants",
    },
  ]);
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const participants = await Conversation.aggregatePaginate(
    participantsAggregate,
    options
  );

  if (!participants) {
    throw new ApiError(400, "conversation not founded");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, participants, "conversation find successfully"));
});

const deleteConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await Conversation.findById(conversationId);

  if (
    !conversation.participants
      .map((id) => id.toString())
      .includes(req.user._id.toString())
  ) {
    throw new ApiError(401, "Only participants can delete");
  }

  await Conversation.findByIdAndDelete(conversationId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "conversation deleted successfully"));
});


export { getUserConversation, deleteConversation };
