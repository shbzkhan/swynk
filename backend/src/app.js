import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./utils/serviceAccountKey.json")                  )
);
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

//import statement
import userRouter from "./routes/user.routes.js";
import requestRouter from "./routes/request.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import storyRouter from "./routes/story.routes.js";

//router declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/stories", storyRouter);

export { app };
