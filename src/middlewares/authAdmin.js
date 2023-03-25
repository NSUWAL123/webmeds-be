const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  const authtoken = req.header("auth-token");
  console.log("authtoken ayo");
  if (!authtoken) {
    console.log("token ta chaina ta");
    res.send("Please authenticate using a valid token.");
    return;
  }
  try {
    const data = jwt.verify(authtoken, process.env.JWT_SECRET);
    req.user = data.user;
    const checkedUser = await User.findById(data.user.id);
    if (checkedUser.role !== "admin") {
      return;
    }
    next();
  } catch (error) {
    res.send("Please authenticate using a valid token2.");
    console.log(error);
  }
};

module.exports = authAdmin;
