import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import {
  deleteMessage,
  getConversationMessages,
  sendMessage,
} from "../controllers/message.controllers.js";

const router = Router();

router.use(auth);
router
      .route("/:conversationId")
      .get(getConversationMessages)
      .post(sendMessage);

router.route("/:conversationId/:messageId").delete(deleteMessage)


export default router;
