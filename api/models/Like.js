import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});

export default mongoose.model("Like", likeSchema);
