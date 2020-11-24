import express from "express";
import { postController } from "../../controllers/postController";
import upload from "../../middlewares/multer";
const postsRouter = express.Router();

// 전체 포스트
postsRouter.get("/", postController.get_all_posts);
// 포스트 하나
postsRouter.get("/:postId", postController.get_one_post);
// 포스트 업로드
postsRouter.post("/", upload.single("image"), postController.create_one_post);
// 포스트 수정
postsRouter.put(
  "/:postId",
  upload.single("image"),
  postController.update_one_post,
);
// 포스트 삭제
postsRouter.delete("/:postId", postController.delete_one_post);
// 포스트 좋아요
postsRouter.post("/toggleLike/:postId", postController.toggle_like);

export default postsRouter;
