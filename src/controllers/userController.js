const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { sendMail, sendSignUpSuccessfulMail } = require("../utils/email");

// 1. Signup module
const signup = async (req, res) => {
  const { name, email, mobile, dob, password } = req.body;
  const isUserInDB = await User.findOne({ email });

  if (!name || !email || !mobile || !dob || !password) {
    res.send("Missing Fields");
    return;
  }

  if (isUserInDB) {
    res.json({
      message: "User with this email already exits.",
      lvl: "error",
      data: "",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(password, salt);

  let user = await User.create({
    name: name,
    email: email,
    mobile: mobile,
    dob: dob,
    password: securePass,
    billingAddress: "",
  });

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
  sendMail(user.email, "Verify Email", url);

  res.json({
    message:
      "An email has been sent to your account for verification. Please verify.",
    lvl: "info",
    data: "",
  });
};

// 2. Login module
const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.send("Missing fields.");
    return;
  }

  //if user does not exists
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      message: "User Not Registered. Please Signup",
      lvl: "error",
      data: "",
    });
    return;
  }

  const isPassMatched = await bcrypt.compare(password, user.password);

  //if password does not match
  if (!isPassMatched) {
    res.json({
      message: "Invalid Credentials.",
      lvl: "error",
      data: "",
    });
    return;
  }

  //if user not verified & send token is expired then generate new token
  if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      let token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });

      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      sendMail(user.email, "Verify Email", url);
    }
    res.json({
      message:
        "An Email with verification link has been sent to you. Please check your Email.",
      lvl: "info",
      data: "",
    });
    return;
  }

  const data = {
    user: {
      id: user._id,
    },
  };

  const authtoken = jwt.sign(data, process.env.JWT_SECRET);
  res.json({
    message: "Successfully Logged In.",
    lvl: "success",
    data: authtoken,
    role: user.role,
  });
};

//3. verify token
const verifyToken = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  //if user does not exist
  if (!user) {
    res.send("Invalid Verification Link.");
    return;
  }

  //find token from db
  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!token) {
    res.send("Invalid Verification Link.");
    return;
  }

  //updating verified status to true if user clicks verification link
  await User.findByIdAndUpdate(user._id, { verified: true });

  //send success mail to user
  sendSignUpSuccessfulMail(user.email, user.name);

  //then remove token from the db
  await token.remove();
  res.send("Email Verified Successfully.");
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

//update user details
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    mobile: req.body.mobile,
    billingAddress: req.body.billingAddress,
  });

  res.json("User updated successfully.");
};

const updateAddress = async (req, res) => {
  const address = await User.findByIdAndUpdate(req.user.id, {
    billingAddress: req.body.billingAddress,
  });

  res.json("Billing address updated successfully.");
};

//finding user by id
const getUserById = async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  console.log(user);
  res.json(user);
};

// #. PASSWORD RESET REQUEST
const resetPassword = async (req, res) => {
  console.log(req.body.email)
  const user = await User.findOne({email: req.body.email});
  console.log(user)
  if (!user) {
    res.json({
      message:
        "Please enter a valid email address.",
      lvl: "warning",
      data: "",
    });
    return;
  }

  const isTokenInDB = await Token.findOne({userId: user._id});
  console.log(isTokenInDB)
  if (isTokenInDB) {
    res.json({
      message:
        "Verification Link already sent to your Email.",
      lvl: "danger",
      data: "",
    });
    return;
  }
  console.log(user._id)

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });


  const url = `${process.env.BASE_URL}password/reset/${user._id}/${token.token}`;
  sendMail(user.email, "Reset Password", url);
  res.json({
    message:
      "An link to reset your password has been sent to your Email. Please check your Email.",
    lvl: "info",
    data: "",
  });

  
  // PASSWORD RESET LINK

};

module.exports = {
  signup,
  login,
  verifyToken,
  getUser,
  updateUser,
  updateAddress,
  getUserById,
  resetPassword,
};
