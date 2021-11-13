const router = require("express").Router();
const authRoutes = require("./auth");
const postRouter = require("./posts");
const upload = require("../middleware/cloudinary");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("index");
});

router.post(
  "/user/updateProfilePic",
  upload.single("profilePic"),
  (req, res) => {
    const { userId } = req.body;
    User.findByIdAndUpdate(userId, { profilePic: req.file.path }, { new: true })
      .then((updatedUser) => {
        res.json({
          success: true,
          profilePic: updatedUser.profilePic,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: "We screwed up in the server! CHECK IT OUT",
        });
      });
  }
);

router.use("/auth", authRoutes);
router.use("/posts", postRouter);

module.exports = router;
