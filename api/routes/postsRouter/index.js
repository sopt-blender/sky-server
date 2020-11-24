import express from "express";
import { postController } from "../../controllers/postController";
import {upload_desktop, upload_mobile} from "../../middlewares/multer";
const postsRouter = express.Router();

// 전체 포스트 조회 : 쿼리스트링으로 imagetype=1 혹은 imagetype=2 필터 가능. 없을 경우 전체조회.
postsRouter.get("/", postController.get_all);
// 포스트 하나 조회
postsRouter.get("/:postId", postController.get_post);

// 포스트 업로드 - 데스크탑
postsRouter.post('/desktop', upload_desktop.single('image'), postController.create_post);
// 포스트 업로드 - 모바일
postsRouter.post('/mobile', upload_mobile.single('image'), postController.create_post);

// 포스트 수정 - 데스크탑
postsRouter.put("/desktop/:postId", upload_desktop.single("image"), postController.update_post);
// 포스트 수정 - 모바일
postsRouter.put("/mobile/:postId", upload_mobile.single("image"), postController.update_post);

// 포스트 삭제
postsRouter.delete("/:postId", postController.delete_post);
// 포스트 찜
postsRouter.post("/scrap/:postId");

export default postsRouter;
