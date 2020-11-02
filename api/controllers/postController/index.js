import userModel from "../../models/userModel";
import responseMessage from "../../modules/responseMessage";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";

export const postController = {
  get_all: async (req, res, next) => {
    try {
      const posts = await userModel.find().exec();
      console.log(posts);
      res
        .status(statusCode.OK)
        .json(util.success(statusCode.OK, "짜잔", posts));
    } catch (error) {
      console.log(error);
      res.status(statusCode.BAD_REQUEST).json(
        util.fail(statusCode.BAD_REQUEST, "포스트가 없습니다"), // 에러 메시지 추가
      );
    }
  },
  // create_post: async (req, res, next) => {
  //   try {
  //     const newPost = {
  //       image,
  //     };
  //   }
  // },
};
