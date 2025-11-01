import { Router } from "express";
import { getUserConversation } from "../controllers/conversation.controllers.js";

import { auth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(auth);
router.route("/").get(getUserConversation);

export default router;
