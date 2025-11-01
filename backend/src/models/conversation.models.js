import mongoose, { Schema } from "mongoose";
import aggregatePaginate  from "mongoose-aggregate-paginate-v2"
const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    groupChat: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

conversationSchema.plugin(aggregatePaginate)

export const Conversation = mongoose.model("Conversation", conversationSchema);
