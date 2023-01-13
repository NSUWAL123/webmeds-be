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
    res.send("User already exists.");
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
  });

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
  sendMail(user.email, "Verify Email", url);

  res.json({user})
  // res.send("An Email has been sent to your account. Please verify.");
};

// 2. Login module
const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.send("Missing fields.");
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.send("User not registered. Please Signup");
    return;
  }

  const isPassMatched = await bcrypt.compare(password, user.password);

  if (!isPassMatched) {
    res.send("Invalid Credentials.");
    return;
  }

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

    return res.send(
      "An Email with verification link has been sent to you. Please check your Email."
    );
 
  }

  const data = {
    user: {
      id: user._id,
    }
  }

  const authtoken = jwt.sign(data, process.env.JWT_SECRET);
  res.json({authtoken: authtoken, status: true, message: "Successfully Logged In."})
};

//3. verify token
const verifyToken = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.send("Invalid Verification Link.");
    return;
  }
  
  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  
  if (!token) {
    res.send("Invalid Verification Link.");
    return;
  }

  console.log(user)
  await User.findByIdAndUpdate(user._id, {verified: true})
  // await User.updateOne({ _id: user._id, verified: true });

  sendSignUpSuccessfulMail(user.email, user.name);
  await token.remove();

  res.send("Email Verified Successfully.");
};

module.exports = { signup, login, verifyToken };
