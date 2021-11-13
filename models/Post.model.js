const { Schema, model } = require("mongoose");

// THIS IS FOR POSTS

const andrePostSchema = new Schema(
  {
    image: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const AndrePost = model("Post", andrePostSchema);

module.exports = AndrePost;
