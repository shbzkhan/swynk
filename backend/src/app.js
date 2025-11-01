import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

//router declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/conversations", conversationRouter);

export { app };
