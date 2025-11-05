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

userSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();
  this.otp = await bcrypt.hash(this.otp, 10);
  next();
});

userSchema.methods.isOtpCorrect = async function (otp) {
  return bcrypt.compare(otp, this.otp);
};

export const Otp = mongoose.model("Otp", OtpSchema);
