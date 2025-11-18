import { Router } from "express";
import {
  getCurrentUser,
  googleLogin,
  loginUser,
  logoutUser,
  sendOtp,
  refreshAccessToken,
  userRegister,
  verifyOtp,
  searchUser,
} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/register").post(upload.single("avatar"), userRegister);
router.route("/login").post(loginUser);
router.route("/google-login").post(googleLogin);
router.route("/logout").post(auth, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current").get(auth, getCurrentUser);
router.route("/search").get(auth, searchUser);

export default router;
