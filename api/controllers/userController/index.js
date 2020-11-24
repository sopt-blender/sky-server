import User from "../../models/User";
import request from "request";
import jwt from "../../modules/jwt";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";

const userController = {
  kakaoLogin: async (req, res) => {
    const token = "dLx085xKRSNBOuqt-Ix412sSZrrfx-OQGzCVJgorDNQAAAF1-pnn2g";
    const kaHeader = "Bearer " + token; // Bearer 다음에 공백 추가
    const api_url = "https://kapi.kakao.com/v2/user/me";
    const options = {
      url: api_url,
      headers: {
        Authorization: kaHeader,
      },
    };

    request.get(options, async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        const id = data.id;
        const resultUser = await User.findOne({ userId: id });
        if (resultUser) {
          const webtoken = await jwt.sign(id);
          res
            .status(statusCode.OK)
            .json(util.success(statusCode.OK, "성공", webtoken));
        } else {
          let user = new User();
          user.userId = id;
          user.username = data.properties.nickname;
          const webtoken = await jwt.sign(id);
          await user.save();
          res
            .status(statusCode.OK)
            .json(util.success(statusCode.OK, "성공", webtoken));
        }
      } else {
        res.status(500).json({
          message: "Internal server error",
          data: error,
        });
      }
    });
  },
  login: async (req, res) => {
    res.json("로그인");
  },
  snsTypeCheck: (req, res, next) => {},
};

export default userController;
