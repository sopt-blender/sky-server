import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  // 웹토큰 ?
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  scrappedPosts: [{ type: String, ref: "post" }],
});

export default mongoose.model("User", userSchema);
