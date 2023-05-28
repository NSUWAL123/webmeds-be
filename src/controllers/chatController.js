const Chat = require("../models/chatModel");

const getAllChats = async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
};

const getChatByUserId = async (req, res) => {
  let userId;
  if (req.params.id) {
    userId = req.params.id;
  } else {
    userId = req.user.id;
  }
  // const userId = req.user.id;
  const chat = await Chat.find({ userId });
  res.json(chat);
};

const postMessage = async (req, res) => {
  let userId;
  const pharmaId = "64180ba4e09ecb5b8cad465f";
  if (pharmaId == req.user.id) {
    userId = req.params.id;
  } else {
    userId = req.user.id;
  }
  const userInDb = await Chat.findOne({ userId });
  if (!userInDb) {
    const createChat = await Chat.create({
      userId: userId,
      pharmacistId: pharmaId,
      messages: req.body.message,
      date: Date.now(),
    });

    res.json({
      data: createChat,
      message: "Successfully creation of chat",
    });
    return;
  }

  const updateChat = await Chat.findByIdAndUpdate(userInDb._id, {
    messages: [...userInDb.messages, req.body.message],
    date: Date.now(),
  });
  res.json({
    data: updateChat,
    message: "Successfully updation of chat",
  });
};

module.exports = { getAllChats, getChatByUserId, postMessage };
