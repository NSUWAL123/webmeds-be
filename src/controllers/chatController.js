const Chat = require("../models/chatModel");

const getAllChats = async (req, res) => {
  //   const chats = await Chat.find();
  //   res.json(chats);
  console.log("its working");
};

const getChatByUserId = async (req, res) => {
  //   const chat = await Chat.findById();
  //   res.json(chat);
  console.log("its working too");
};

const postMessage = async (req, res) => {
  //   const chat = await Chat.findById();
  //   res.json(chat);
  console.log("its working too yoohooo");
};

module.exports = { getAllChats, getChatByUserId, postMessage };
