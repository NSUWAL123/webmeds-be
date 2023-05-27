const express = require("express");
const {
  getAllChats,
  getChatByUserId,
  postMessage,
} = require("../controllers/chatController");
const router = express.Router();

router.get("/", getAllChats);
router.get("/:id", getChatByUserId);
router.post("/:id", postMessage);

module.exports = router;
