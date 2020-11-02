import postModel from "../../models/postModel";
import responseMessage from "../../modules/responseMessage";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";

export const postController = {
  get_all: async (req, res, next) => {
    try {
      const posts = await postModel.find().exec();
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
  get_post: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await postModel.findById(postId);
      console.log(post);
      res.status(statusCode.OK).json(util.success(statusCode.OK), "짜잔", post);
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.NOT_FOUND)
        .json(
          util.fail(
            statusCode.NOT_FOUND,
            "해당 id를 갖고 있는 포스트를 찾을 수 없습니다",
          ),
        );
    }
  },
  create_post: async (req, res, next) => {
    try {
      const newPost = new postModel({
        image: req.file.path,
        imageType: req.body.imageType,
        location: req.body.location,
        time: req.body.time,
        // user: req.body.userId,
      });
      const post = await newPost.save();
      console.log(post);

      res
        .status(statusCode.CREATED)
        .json(
          util.success(statusCode.CREATED, "포스트가 생성되었습니다", post),
        );
    } catch (error) {
      console.log(error);
      res.status(statusCode.UNAUTHORIZED).json(
        util.fail(statusCode.UNAUTHORIZED, "로그인이 필요합니다"), // 에러 메시지 추가
      );
    }
  },

  update_post: async (req, res, next) => {
    const { productId: id } = req.params;
    const { body: props } = req;
    console.log(props);
    try {
      const updatedPost = await postModel
        .findByIdAndUpdate(id, props, {
          new: true,
        })
        .exec();
      console.log(updatedPost);
      product
        ? res
            .status(statusCode.OK)
            .json(
              util.success(statusCode.OK, "포스트 업데이트 완료", updatedPost),
            )
        : res
            .status(statusCode.NOT_FOUND)
            .json(util.fail(statusCode.NOT_FOUND, "포스트를 찾을 수 없습니다"));
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            "알 수 없는 에러가 발생했습니다",
          ),
        );
    }
  },

  delete_post: async (req, res, next) => {
    try {
      const { _id: postId } = req.params;
      const post = await postModel.findByIdAndDelete(postId);
      res
        .status(statusCode.OK)
        .json(util.success(statusCode.OK, "포스트가 삭제되었습니다", post));
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            "알 수 없는 에러가 발생했습니다",
          ),
        );
    }
  },
};
