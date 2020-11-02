import express from "express";
const usersRouter = express.Router();

// 유저 정보 by Id
usersRouter.get("/:userId");

// 모든 유저 정보

// 회원가입

usersRouter.post("/auth/signup");

// 로그인
usersRouter.post("/auth/login");

export default usersRouter;
