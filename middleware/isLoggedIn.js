const Session = require("../models/Session.model");

const UNAUTHORIZED = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === "null") {
    return res
      .status(UNAUTHORIZED)
      .json({ errorMessage: "You cannot be here" });
  }

  Session.findById(authorization)
    .populate("user")
    .then((foundSession) => {
      if (!foundSession) {
        return res
          .status(UNAUTHORIZED)
          .json({ errorMessage: "You cannot be here" });
      }

      req.user = foundSession.user;
      next();
    });
};

// req
// middleware 1: req.juan = 1
// middleware2: req {...req + juan: 1}
