const upload = require("../middleware/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
const AndrePost = require("../models/Post.model");
const User = require("../models/User.model");

const router = require("express").Router();

router.patch("/update-account", isLoggedIn, (req, res) => {
  const { username } = req.body;
  const { _id } = req.user;

  if (username === req.user.username) {
    return res.json({ user: req.user });
  }

  User.findOne({ username }).then((foundUser) => {
    if (foundUser) {
      return res
        .status(400)
        .json({ errorMessage: "Username already taken. No can dozville" });
    }

    User.findByIdAndUpdate(_id, { username }, { new: true }).then(
      (newImprovedUser) => {
        res.json({ user: newImprovedUser });
      }
    );
  });
});

router.post(
  "/updateProfilePic",
  isLoggedIn,
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

router.post("/follow", isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { following: req.body.target },
    },
    { new: true }
  ).then((newUser) => {
    res.json({ status: true, user: newUser });
  });
});

router.post("/unfollow", isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: req.body.target },
    },
    { new: true }
  ).then((newUser) => {
    res.json({ status: true, user: newUser });
  });
});

router.get("/:thisIsNotOkay", (req, res) => {
  const username = req.params.thisIsNotOkay;

  User.findOne({ username }).then((foundUser) => {
    if (!foundUser) {
      return res
        .status(404)
        .json({ errorMessage: `No user found with ${username} username` });
    }

    AndrePost.find({ owner: foundUser._id }).then((allPostsFromBanana) => {
      return res.json({ user: foundUser, posts: allPostsFromBanana });
    });
  });
});

module.exports = router;
