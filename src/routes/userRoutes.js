const express = require("express");
const router = express.Router();
const { login, signup, verifyToken, getUser, updateUser, updateAddress } = require("../controllers/userController");
const authUser = require("../middlewares/authUser");

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id/verify/:token", verifyToken);
router.get("/getUser", authUser, getUser)
router.post("/update", authUser, updateUser)
router.post("/update-address", authUser, updateAddress)

module.exports = router;
