const router = require("express").Router();
const authRoutes = require("./auth");
const postRouter = require("./posts");
const userRouter = require("./user");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("index");
});

router.use("/auth", authRoutes);
router.use("/posts", postRouter);
router.use("/user", userRouter);

module.exports = router;
