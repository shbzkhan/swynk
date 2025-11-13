import mongoose, { Schema } from "mongoose";
import aggregatePaginate  from "mongoose-aggregate-paginate-v2"
const messageSchema = new Schema(
  {
    content: {
      type: String,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    read:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
messageSchema.plugin(aggregatePaginate)

export const Message = mongoose.model("Message", messageSchema);
