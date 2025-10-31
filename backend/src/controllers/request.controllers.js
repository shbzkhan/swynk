import mongoose from "mongoose";
import { Conversation } from "../models/conversation.models.js";
import { Request } from "../models/request.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const sendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new ApiError(404, "User not exist");
  }
  const conversation = await Conversation.findOne({
    participants: { $all: [req.user._id, receiverId] },
  });
  if (conversation) {
    throw new ApiError(400, "You are already friend");
  }
  const alreadySendRequest = await Request.findOne({
    sender: req.user._id,
    receiver: receiverId,
  });

  if (alreadySendRequest) throw new ApiError(400, "Already sended request");

  const createRequest = await Request.create({
    sender: req.user._id,
    receiver: receiver._id,
  });

  if (!createRequest)
    throw new ApiError(500, "Request send failed, please try again");

  return res
    .status(201)
    .json(
      new ApiResponse(201, { requested: true }, "Request Successfully send")
    );
});
const acceptOrRejectRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  const request = await Request.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.sender.toString() === req.user._id.toString()) {
    throw new ApiError(401, "sender can not accept request");
  }
  if (request.receiver.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "you can not accept request");
  }

  if (status === "rejected") {
    const deleteRequest = await Request.findByIdAndDelete(request);
    if (!deleteRequest) {
      throw new ApiError(400, "Failed to reject the request please try again");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, { accepted: false }, "Rejected successfully"));
  }

  const acceptedRequest = await Conversation.create({
    participants: [req.user._id, request.sender],
  });

  if (!acceptedRequest) {
    throw new ApiError(500, "Request send failed, please try again");
  }
  await Request.findByIdAndDelete(request);

  return res
    .status(201)
    .json(new ApiResponse(201, { accepted: true }, "Accepted successfully"));
});
const cancelRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await Request.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.sender.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "only sender can cancel request");
  }

  const deleteRequest = await Request.findByIdAndDelete(request);
  if (!deleteRequest) {
    throw new ApiError(400, "Failed to reject the request please try again");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(201, { requested: false }, "Cancel request successfully")
    );
});

const getUserRequests = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const request = await Request.aggregate([
    {
      $match: {
        receiver: userId,
        status: "pending",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "sender",
      },
    },
    {
      $unwind: "$sender",
    },
    {
      $project: {
        status: 0,
        receiver: 0,
        __v: 0,
      },
    },
  ]);
  console.log(request);
  if (!request) {
    throw new ApiError(400, "requests not founded");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, request, "requests find successfully"));
});

export { sendRequest, acceptOrRejectRequest, cancelRequest, getUserRequests };
