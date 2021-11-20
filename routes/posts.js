const { Router } = require("express");
const upload = require("../middleware/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
const AndrePost = require("../models/Post.model");
const posts = [
  {
    id: "fancy",
    content: "Im so fancy, you already know. #f4f #friendslearnwithme",
    image: "https://i.ytimg.com/vi/WCcpSyVWMwU/maxresdefault.jpg",
  },
  {
    id: "absdkasdfgkjhsdf",
    content: "This is not an image",
    image:
      "https://static.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425",
  },
];

const router = Router();

router.get("/", isLoggedIn, (req, res) => {
  AndrePost.find({}).then((allFilipePosts) => {
    res.json({ posts: allFilipePosts });
  });
});

router.get("/randomPost", isLoggedIn, (req, res) => {
  /**
   * 1) Call the DB and get all the documents in the Posts collection
   * 2) We select a random one
   * 3) We retrieve the random post from the DB to the BackEnd (controller)
   * 4) From there, we respond with a json that includes that post
   */

  AndrePost.aggregate([{ $sample: { size: 1 } }]).exec((err, randomPost) => {
    if (err) {
      return res.status(500).json({
        errorMessage:
          "Oops, something went wrong in the server, look there for more info.",
      });
    }
    AndrePost.populate(randomPost, { path: "owner" }).then((populatedPost) => {
      res.json({ post: populatedPost });
    });
  });
});

router.post("/create", isLoggedIn, upload.single("juanPostPic"), (req, res) => {
  AndrePost.create({
    owner: req.user._id,
    content: req.body.content,
    image: req.file.path,
  }).then((annasGlasses) => {
    res.json({ post: annasGlasses });
  });
});

router.get("/:mufasa", (req, res) => {
  const { mufasa } = req.params;

  AndrePost.findById(mufasa)
    .populate("owner")
    .then((chrisPost) => {
      if (!chrisPost) {
        return res
          .status(404)
          .json({ errorMessage: `Post with the id ${mufasa} does not exist` });
      }

      res.json({ post: chrisPost });
    });
});

router.patch("/like", isLoggedIn, (req, res) => {
  AndrePost.findByIdAndUpdate(
    req.body.id,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    { new: true }
  )
    .populate("owner")
    .then((whateverThePost) => {
      // res.json("Hello there from the be");
      res.json({ post: whateverThePost });
    })
    .catch((err) => {
      console.error(`Err: `, err.message);
      res.json(500).json({ errorMessage: "No post with that id" });
    });
});

router.patch("/unlike", isLoggedIn, (req, res) => {
  AndrePost.findByIdAndUpdate(
    req.body.id,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    { new: true }
  )
    .populate("owner")
    .then((whateverThePost) => {
      // res.json("Hello there from the be");
      res.json({ post: whateverThePost });
    })
    .catch((err) => {
      console.error(`Err: `, err.message);
      res.json(500).json({ errorMessage: "No post with that id" });
    });
});

module.exports = router;
