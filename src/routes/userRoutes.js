const express = require("express");
const router = express.Router();
const { login, signup, verifyToken } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/:id/verify/:token", verifyToken);

module.exports = router;
