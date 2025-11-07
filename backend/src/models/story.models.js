import mongoose, { Schema } from "mongoose";
import aggregatePaginate  from "mongoose-aggregate-paginate-v2"

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
    viewers:[{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    caption:{
        type: String,
    },
    expiresAt:{
        type: Date
    }
  },
  { timestamps: true }
);
storySchema.plugin(aggregatePaginate)

export const Story = mongoose.model("Story", storySchema);
