import Like from "../../models/Like";
import Post from "../../models/Post";
import responseMessage from "../../modules/responseMessage";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";

export const postController = {
  get_all_posts: async (req, res, next) => {
    try {
      const posts = await Post.find().exec();
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
  get_my_posts: async (req, res, next) => {
    const { id: userId } = req.user;
    try {
      const myPosts = await Post.find({ creator: userId }).exec();
      console.log(myPosts);
    } catch (error) {
      console.log(error);
    }
  },
  get_one_post: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      post
        ? res
            .status(statusCode.OK)
            .json(util.success(statusCode.OK, "짜잔", post))
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
  create_one_post: async (req, res, next) => {
    try {
      const newPost = await Post.create({
        image: req.file.location,
        imageType: req.body.imageType,
        location: req.body.location,
        time: req.body.time,
        creator: req.user.id,
      });

      res
        .status(statusCode.CREATED)
        .json(
          util.success(statusCode.CREATED, "포스트가 생성되었습니다", newPost),
        );
    } catch (error) {
      console.log(error);
      res.status(statusCode.UNAUTHORIZED).json(
        util.fail(statusCode.UNAUTHORIZED, "로그인이 필요합니다"), // 에러 메시지 추가
      );
    }
  },

  update_one_post: async (req, res, next) => {
    try {
      const { postId } = req.params;
      console.log(req.body);
      const props = {
        imageType: req.body.imageType,
        location: req.body.location,
        time: req.body.time,
      };
      console.log(props);
      const updatedPost = await Post.findByIdAndUpdate(postId, props, {
        new: true,
      }).exec();
      console.log(updatedPost);
      updatedPost
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

  delete_one_post: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await Post.findByIdAndDelete(postId);
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
  toggle_like: async (req, res, next) => {
    try {
      const { id: userId } = req.user;
      const { postId } = req.params;
      console.log(userId);
      // const post = await Post.findById(postId);
      const alreadyLike = await Like.find({ userId, postId });
      if (alreadyLike) {
        await Like.deleteOne({ userId, postId });
        return res
          .status(statusCode.OK)
          .json(
            util.success(
              statusCode.OK,
              responseMessage.UNLIKE_SUCCESS,
              alreadyLike,
            ),
          );
      } else {
        const like = await Like.create({
          userId,
          postId,
        });
        return res
          .status(statusCode.OK)
          .json(
            util.success(statusCode.OK, responseMessage.LIKE_SUCCESS, like),
          );
      }
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.TOGGLE_LIKE_FAIL,
          ),
        );
    }
  },
};
