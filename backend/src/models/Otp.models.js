import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    otp: {
      type: String,
      required: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

OtpSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.otp) {
    update.otp = await bcrypt.hash(update.otp, 10);
    this.setUpdate(update);
  }
});

OtpSchema.methods.isOtpCorrect = async function (otp) {
  return bcrypt.compare(otp, this.otp);
};

export const Otp = mongoose.model("Otp", OtpSchema);
