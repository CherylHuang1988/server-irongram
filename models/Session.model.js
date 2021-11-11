const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Session = model("Session", sessionSchema);

module.exports = Session;
