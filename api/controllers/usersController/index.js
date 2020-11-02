import userModel from '../../models/userModel'

const userController = {
  "signup" : async (req,res)=> {
    req.json("오오")
  },
  "login" : async(req,res) => {
    res.json("로그인")
  },
  "snsTypeCheck" : (req, res, next) => {
    var token = req.body.token
    var kaHeader = "Bearer " + token; // Bearer 다음에 공백 추가
    var api_url = 'https://kapi.kakao.com/v2/user/me';
    var request = require('request');
    var options = {
      url: api_url,
      headers: {
        'Authorization': kaHeader
      }
    };
    console.log('카카오')
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body)
        req.body.email = data.kakao_account.email
        req.body.name = data.kakao_account.profile.nickname
        next();

      } else {
        res.status(500).json({
          message:"Internal server error",
          data:response.statusCode
        })
      }
    });
   
  }
}



export default userController 