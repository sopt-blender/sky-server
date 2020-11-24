import express from "express";
import userController from "../../controllers/userController/index";
import auth from "../../middlewares/auth";

const usersRouter = express.Router();

// 유저 정보 by Id
usersRouter.get("/:userId", userController.get_one_user);

// 모든 유저 정보

// 회원가입
usersRouter.post("/auth/login", userController.kakaoLogin);

// 로그인

export default usersRouter;
