import mongoose, { Schema } from "mongoose";
const storySchema = new Schema(
  {
    storyFile: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption:{
        type: String,
    },
    expiresAt:{
        type: Date
    }
  },
  { timestamps: true }
);

export const Story = mongoose.model("Story", storySchema);
