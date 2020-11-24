import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: { type: String, required: true },
  imageType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  location: { type: String, required: true },
  time: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Post", postSchema);
