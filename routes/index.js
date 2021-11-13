const router = require("express").Router();
const authRoutes = require("./auth");
const postRouter = require("./posts");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("index");
});

router.use("/auth", authRoutes);
router.use("/posts", postRouter);

module.exports = router;
