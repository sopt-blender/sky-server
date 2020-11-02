import express from "express";
import { postController } from "../../controllers/postController";
import upload from "../../middlewares/multer";
const postsRouter = express.Router();

// 전체 포스트
postsRouter.get("/", postController.get_all);
// 포스트 하나
postsRouter.get("/:postId", postController.get_post);
// 포스트 업로드
postsRouter.post("/", upload.single("image"), postController.create_post);
// 포스트 수정
postsRouter.put("/:postId", postController.update_post);
// 포스트 삭제
postsRouter.delete("/:postId", postController.delete_post);
// 포스트 찜
postsRouter.post("/scrap/:postId");

export default postsRouter;
