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

  AndrePost.findById(mufasa).then((chrisPost) => {
    if (!chrisPost) {
      return res
        .status(404)
        .json({ errorMessage: `Post with the id ${mufasa} does not exist` });
    }

    res.json({ post: chrisPost });
  });
});

module.exports = router;
