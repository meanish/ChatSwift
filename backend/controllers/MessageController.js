const messageOriginal = require("../src/models/message");
const userOriginal = require("../src/models/userRegister");
const chatOriginal = require("../src/models/chat");

module.exports = {
  SendMessage: async (req, res) => {
    const { chatId, content } = req.body;

    if (!content || !chatId) {
      console.log("No chatId or content");
      return;
    }

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      // Setting message structure
      let Message = await messageOriginal.create(newMessage);
      Message = await Message.populate("sender", "firstname email");
      Message = await Message.populate("chat");
      Message = await userOriginal.populate(Message, {
        path: "chat.users",
        select: "firstname email",
        //updating latestMessage with the current message
      });
      await chatOriginal.findByIdAndUpdate(req.body.chatId, {
        latestMessage: Message,
      });
      res.json(Message);
    } catch (e) {
      console.log(e);
    }
  },

  GetMessage: async (req, res) => {
    try {
      const getAllChats = await messageOriginal
        .find({
          chat: req.params.chatId,
        })
        .populate("sender", "firstname email")
        .populate("chat");

      res.json(getAllChats);
    } catch (e) {
      console.log("Error in getting all the messages");
    }
  },
};
