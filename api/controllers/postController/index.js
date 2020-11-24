import Post from "../../models/Post";
import User from "../../models/User";
import responseMessage from "../../modules/responseMessage";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";

export const postController = {
  get_all_posts: async (req, res, next) => {
    try {
      const { image_type, page } = req.query;

      const posts = await Post.find(
        image_type ? { imageType: image_type } : {},
        { image: 1, imageType: 1, location: 1, time: 1, creatorId: 1 },
        page ? { skip: (page - 1) * 20, limit: 20 } : {},
      );
      res
        .status(statusCode.OK)
        .json(
          util.success(
            statusCode.OK,
            responseMessage.POSTS_GET_ALL_SUCCESS,
            posts,
          ),
        );
    } catch (error) {
      console.log(error);
      res.status(statusCode.BAD_REQUEST).json(
        util.fail(statusCode.BAD_REQUEST, "포스트가 없습니다"), // 에러 메시지 추가
      );
    }
  },
  get_my_posts: async (req, res, next) => {
    const { _id: userId } = req.user;
    if (!userId) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json(
          util.fail(statusCode.UNAUTHORIZED, responseMessage.LOGIN_REQUIRED),
        );
    }
    try {
      const myPosts = await Post.find(
        { creatorId: userId },
        { image: 1, imageType: 1, location: 1, time: 1, creatorId: 1 },
      ).exec();
      res
        .status(statusCode.OK)
        .json(
          util.success(
            statusCode.OK,
            responseMessage.POSTS_GET_MINE_SUCCESS,
            myPosts,
          ),
        );
    } catch (error) {
      console.log(error);
    }
  },
  get_liked_posts: async (req, res, next) => {
    const { _id: userId } = req.user;
    if (!userId) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json(
          util.fail(statusCode.UNAUTHORIZED, responseMessage.LOGIN_REQUIRED),
        );
    }
    try {
      const user = await User.findById(userId);
      const likedPosts = user.likedPosts;
      res
        .status(statusCode.OK)
        .json(
          util.success(
            statusCode.OK,
            responseMessage.POSTS_GET_LIKED_SUCCESS,
            likedPosts,
          ),
        );
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  },

  get_one_post: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      post
        ? res
            .status(statusCode.OK)
            .json(
              util.success(
                statusCode.OK,
                responseMessage.POSTS_GET_ONE_SUCCESS,
                post,
              ),
            )
        : res
            .status(statusCode.NOT_FOUND)
            .json(
              util.fail(
                statusCode.NOT_FOUND,
                responseMessage.POSTS_GET_ONE_FAIL,
              ),
            );
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
    const imageType = req._parsedUrl.pathname.substring(1);
    const { location, time } = req.body;
    const { _id: userId } = req.user;
    if (!userId) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json(
          util.fai(statusCode.UNAUTHORIZED, responseMessage.LOGIN_REQUIRED),
        );
    }
    try {
      const newPost = await Post.create({
        image: req.file.transforms[0].location,
        imageType,
        location,
        time,
        creatorId: userId,
      });

      res
        .status(statusCode.CREATED)
        .json(
          util.success(
            statusCode.CREATED,
            responseMessage.POST_CREATE_SUCCESS,
            newPost,
          ),
        );
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
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
    const { _id: userId } = req.user;
    const { postId } = req.params;
    try {
      const user = await User.findById(userId);
      const post = await Post.findById(postId, {
        image: 1,
        imageType: 1,
        location: 1,
        time: 1,
        creatorId: 1,
      });

      if (!user.likedPosts.includes(postId)) {
        // 좋아요 생성
        await User.updateOne(
          { _id: userId, likedPosts: { $ne: postId } },
          { $push: { likedPosts: postId } },
        );
        return res
          .status(statusCode.OK)
          .json(
            util.success(statusCode.OK, responseMessage.LIKE_SUCCESS, post),
          );
      } else {
        // 좋아요 제거
        await User.updateOne(
          { _id: userId, likedPosts: { $eq: postId } },
          { $pull: { likedPosts: postId } },
        );
        return res
          .status(statusCode.OK)
          .json(
            util.success(statusCode.OK, responseMessage.UNLIKE_SUCCESS, post),
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
