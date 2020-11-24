import express from "express";
import { postController } from "../../controllers/postController";
import { upload_desktop, upload_mobile } from "../../middlewares/multer";
import auth from "../../middlewares/auth";

const postsRouter = express.Router();

/**
 * 포스트 조회 (쿼리스트링 포함)
 * ?imagetype=1&page=1 : 데스크탑 post 1번째~20번째 조회
 * ?imagetype=2&page=2 : 모바일 post 21번째~40번째 조회
 * 쿼리스트링 없을경우 : 전체조회
 */
postsRouter.get("/", postController.get_all_posts);

// 내 포스트 조회
postsRouter.get("/", postController.get_my_posts);

// 포스트 하나 조회
postsRouter.get("/:postId", postController.get_one_post);

// 포스트 업로드 - 데스크탑
postsRouter.post(
  "/desktop",
  auth.checkToken,
  upload_desktop.single("image"),
  postController.create_one_post,
);
// 포스트 업로드 - 모바일
postsRouter.post(
  "/mobile",
  auth.checkToken,
  upload_mobile.single("image"),
  postController.create_one_post,
);

// 포스트 수정 - 데스크탑
postsRouter.put(
  "/desktop/:postId",
  upload_desktop.single("image"),
  postController.update_one_post,
);
// 포스트 수정 - 모바일
postsRouter.put(
  "/mobile/:postId",
  upload_mobile.single("image"),
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
