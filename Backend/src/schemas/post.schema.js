import { models, Schema } from "mongoose";

const postSchema = new Schema({
  caption: {
    type: String,
    required: [true, "This field is required"],
    minLength: 5,
  },
  image: {
    type: String,
    required: [true, "This field is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = models("Post", postSchema);

export { Post };
