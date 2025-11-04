import { Router } from "express";
import {
  getCurrentUser,
  googleLogin,
  loginUser,
  logoutUser,
  otpSend,
  refreshAccessToken,
  userRegister,
} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";
// import { upload } from "../middlewares/multer.middleware

const router = Router();

router.route("/send-otp").get(otpSend);
router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/google-login").post(googleLogin);
router.route("/logout").post(auth, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current").get(auth, getCurrentUser);

export default router;
