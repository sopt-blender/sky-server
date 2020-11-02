import userModel from '../../models/userModel'

const userController = {
  "signup" : async (req,res)=> {
    req.json("오오")
  },
  "login" : async(req,res) => {
    res.json("로그인")
  }
}

export default userController 