import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const pendingUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Date,
      default:false
    },
    verifiedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
