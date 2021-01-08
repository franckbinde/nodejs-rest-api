import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: String,
    required: true
  }
});

export default mongoose.model("Posts", PostSchema);
