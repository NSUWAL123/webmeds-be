const express = require("express");
const router = express.Router();
const { login, signup, verifyToken, getUser, updateUser, updateAddress, getUserById, resetPassword, updatePassword, findTokenInDB } = require("../controllers/userController");
const authUser = require("../middlewares/authUser");

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id/verify/:token", verifyToken);
router.get("/getUser", authUser, getUser);
router.post("/update", authUser, updateUser);
router.post("/update-address", authUser, updateAddress);
router.get("/getUserById/:id", getUserById);
router.post("/reset-password/", resetPassword);
router.get("/findTokenInDB/:token", findTokenInDB);
router.put("/updatePassword", updatePassword);

module.exports = router;
