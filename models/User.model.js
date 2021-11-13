const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, //-> Ideally, should be unique, but its up to you
    },
    password: String,
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dlfxinw9v/image/upload/v1621081955/rottenPotatoes/rottenPotatoesCoverPic_pd81j6.png",
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
