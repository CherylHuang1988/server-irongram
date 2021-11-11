const YOU_SHALL_NOT_PASS = "400"; // Bad Request

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization !== "null") {
    return res
      .status(YOU_SHALL_NOT_PASS)
      .json({ errorMessage: "You should not be here" });
  }
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page

  next();
};
