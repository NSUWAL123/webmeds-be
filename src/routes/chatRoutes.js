const express = require("express");
const {
  getAllChats,
  getChatByUserId,
  postMessage,
} = require("../controllers/chatController");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");

const router = express.Router();

router.get("/", authAdmin, getAllChats);
router.get("/id", authUser, getChatByUserId);
router.get("/id/:id", getChatByUserId);
router.post("/id/:id", authUser, postMessage);
router.post("/id", authUser, postMessage);

module.exports = router;
