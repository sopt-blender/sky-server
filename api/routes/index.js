import express from "express";
import postsRouter from "./postsRouter";
import usersRouter from "./usersRouter";
const indexRouter = express.Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/posts", postsRouter);

export default indexRouter;
