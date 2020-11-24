import express from "express";
import { postController } from "../../controllers/postController";
import auth from "../../middlewares/auth";
import upload from "../../middlewares/multer";
const postsRouter = express.Router();

// 전체 포스트 조회
postsRouter.get("/", postController.get_all_posts);

// 내 포스트 조회
postsRouter.get("/my", auth.checkToken, postController.get_my_posts);

// 포스트 하나
postsRouter.get("/:postId", postController.get_one_post);
// 포스트 업로드
postsRouter.post(
  "/",
  auth.checkToken,
  upload.single("image"),
  postController.create_one_post,
);
// 포스트 수정
postsRouter.put(
  "/:postId",
  auth.checkToken,
  upload.single("image"),
  postController.update_one_post,
);
// 포스트 삭제
postsRouter.delete("/:postId", postController.delete_one_post);
// 포스트 좋아요
postsRouter.post(
  "/toggleLike/:postId",
  auth.checkToken,
  postController.toggle_like,
);

export default postsRouter;
