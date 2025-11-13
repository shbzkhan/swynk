import { Router } from "express";
import { deleteConversation, getUserConversation } from "../controllers/conversation.controllers.js";

import { auth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(auth);
router.route("/").get(getUserConversation);
router.route("/delete/:conversationId").post(deleteConversation);

export default router;
