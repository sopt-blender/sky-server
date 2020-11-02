import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: { type: String, required: true },
  imageType: { type: Number, required: true }, // 1 = Desktop, 2 = Mobile, 3 = All
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  location: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export default mongoose.model("post", postSchema);
