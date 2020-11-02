import express from "express";
import { postController } from "../../controllers/postController";
import userModel from "../../models/userModel";
import responseMessage from "../../modules/responseMessage";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";
const postsRouter = express.Router();

// 전체 포스트
postsRouter.get("/", postController.get_all);
// 포스트 하나
postsRouter.get("/:postId");
// 포스트 업로드
postsRouter.post("/");
// 포스트 수정
postsRouter.put("/:postId");
// 포스트 삭제
postsRouter.delete("/:postId");
// 포스트 찜
postsRouter.post("/scrap/:postId");

export default postsRouter;
