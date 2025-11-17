import mongoose from "mongoose";
import { Message } from "../models/message.models.js";
import { Conversation } from "../models/conversation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendNotificationToDevice } from "../utils/sendNotificationToDevice.js";

const getConversationMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  // console.log(conversationId)
  const messageAggregate = Message.aggregate([
    {
      $match: {
        conversation: new mongoose.Types.ObjectId(conversationId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "sender",
        pipeline: [
          {
            $project: {
              avatar: 1,
              username: 1,
              fullname: 1,
            },
          },
        ],
      },
    },
    {
      $addFields:{
        sender:{
          $first:"$sender"
        }
      }
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const message = await Message.aggregatePaginate(messageAggregate, options);
  await Message.updateMany(
    {
      conversation: conversationId,
      sender: { $ne: req.user._id },
      read: false,
    },
    {
      $set: {
        read: true,
      },
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, message, "message find successfully"));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;

  const conversation = await Conversation.findById(conversationId)
    .populate("participants", "fullname username fcmToken")
    .lean();
  if (
    !conversation.participants
      .map((p) => p._id.toString())
      .includes(req.user._id.toString())
  ) {
    throw new ApiError(401, "Only participants can send message");
  }
  const receiver = conversation.participants.find(
    (u) => u._id.toString() !== req.user._id.toString()
  );

  if (!receiver) {
    throw new ApiError(400, "Friend not found in this conversation");
  }
  console.log(receiver);
  const message = await Message.create({
    content,
    conversation: conversationId,
    sender: req.user._id,
    read: false,
  });

  if (!message) {
    throw new ApiError(404, "Message not send");
  }
  if (receiver.fcmToken) {
    console.log(receiver.fcmToken)
    console.log(req.user.avatar)
    const safeAvatar = req.user.avatar ? encodeURI(req.user.avatar) : null
        await sendNotificationToDevice({
          token: receiver.fcmToken,
          title: req.user.fullname,
          body: `New message`,
          imageUrl: safeAvatar,
        });
      }
  return res
    .status(200)
    .json(new ApiResponse(200, message, "message send successfully"));
});

export { getConversationMessages, sendMessage };
