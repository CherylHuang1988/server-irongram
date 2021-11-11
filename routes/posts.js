const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
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
  res.json({ posts });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const singlePost = posts.find((element) => element.id === id); // Post.findById(id).then(singlePost => {if (!singlePost) {}})
  console.log("singlePost:", singlePost);

  if (!singlePost) {
    return res
      .status(404)
      .json({ errorMessage: `Post with the id ${id} does not exist` });
  }

  res.json({ post: singlePost });
});

module.exports = router;
