import { Router } from "express";
import {
  acceptOrRejectRequest,
  cancelRequest,
  getUserRequests,
  sendRequest,
} from "../controllers/request.controllers.js";

import { auth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(auth);
router.route("/").get(getUserRequests);
router.route("/send/:receiverId").post(sendRequest);
router.route("/accept/:requestId").post(acceptOrRejectRequest);
router.route("/cancel/:requestId").post(cancelRequest);

export default router;
