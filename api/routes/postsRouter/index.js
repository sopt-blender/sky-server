import express from "express";
const postsRouter = express.Router();

/* GET users listing. */
postsRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 전체 포스트
postsRouter.get("/");
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
