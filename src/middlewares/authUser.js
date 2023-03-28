const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const authtoken = req.header("auth-token");

  if (!authtoken) {
    res.send("Please authenticate using a valid token.");
    return;
  }
  try {
    const data = jwt.verify(authtoken, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.send("Please authenticate using a valid token2.");
  }
};

module.exports = authUser;
