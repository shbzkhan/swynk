import { Router } from "express";
import {
  createStory,
  getUserStories,
} from "../controllers/story.controllers.js";

import { auth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(auth);
router.route("/").post(createStory);
router.route("/me").post(getUserStories);

export default router;
