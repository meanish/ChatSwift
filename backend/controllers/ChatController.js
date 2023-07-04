const chats = require("../Data/data");
const chatOriginal = require("../src/models/chat");
const userOriginal = require("../src/models/userRegister");
module.exports = {
    
  //Searching for a user friend chat. If not vcreateing new document and store in chatOriginal
  AccessChat: async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json("UserId not Found Params id maybe");
    }

    //ischat finding document having 2 account an admin account and the receiver account & we populating userdetails aand message detailing
    var isChat = await chatOriginal
      .find({
        isGroupChat: false,

        //cuurent user loggin and user id that we are provided with
        users: { $all: [req.user._id, userId] },
      })
      .populate("users") //if chat is found ppulate means put all the val inside the array in the chat
      .populate("latestMessage"); //get the message from messageOriginal

    //Document is further populated to get the latestmsg in chatOriginal further ref from the msgorignal to get sender
    isChat = await userOriginal.populate(isChat, {
      path: "latestMessage.sender", //go for sender which means userOriginal document with all name,add,etc
      select: "firstname lastname email", //from all document populate name email
    }); //message Original contain sender with userOriginal ref so populate without password

    //isChat will provide an array Chat Original with populated users array from userOriginal all connnected

    if (isChat.length > 0) {
      res.send(isChat); //sending document if allready exists
    } else {
      var ChatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId], //adding two communicator document in chatoriginal
      };
      try {
        const createdChat = await chatOriginal.create(ChatData); //adding pushing

        //searching the document of chatOriginal with the id genrsated wile pushing two in chatoriginal

        const FullChat = await chatOriginal
          .findOne({ _id: createdChat._id })
          .populate("users", "-password");

        res.send(FullChat); //This is probably a new document created between 2 new friends chatlist
      } catch (E) {
        res.send(E);
      }
    }
  },

  //fetch all the chat of a admin user(get req)
  FetchChat: async (req, res) => {
    try {
      const Allchats = await chatOriginal
        .find({
          users: { $elemMatch: { $eq: req.user._id } },
        })
        .populate("users", "-password") //if chat is found ppulate means put all the val inside the array in the chat
        .populate("latestMessage") //get the message from messageOriginal
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 }) //sorting latest first wrt to time created

        .then(async (results) => {
          results = await userOriginal.populate(results, {
            path: "latestMessage.sender",
            select: "firstname lastname email",
          });
          res.status(200).send(results);
        });
    } catch {
      res.json("Failed to send all messages");
    }
  },

  // create a groupchat and store in chat Original
  CreateGroup: async (req, res) => {
    if (!req.body.users || !req.body.chatName) {
      //these are group anme and members from frontend
      return res.json("Fill the name of the group");
    }

    var users = JSON.parse(req.body.users); //users store the members of the group ( Stringfy in front)

    if (users.length < 2) {
      return res.json("Morethan 2 users need for group");
    }

    users.push(req.user); //adding admin to the user array

    try {
      //cretae means a new document original
      const groupChat = await chatOriginal.create({
        chatName: req.body.chatName,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullGroupChat = await chatOriginal
        .findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.json(groupChat);
    } catch (e) {
      res.send("Cannot create a group chat");
    }
  },

  RenameGroup: async (req, res) => {
    const { _id, chatName } = req.body; //chatName is actually get once new name is entered and save btn

    const rename = await chatOriginal
      .findByIdAndUpdate(
        _id,
        { chatName },
        { new: true } //new true so that to know theres change and updates chatName
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!rename) {
      res.send("Cannot chnage the name");
    } else {
      res.json(rename);
    }
  },

  AddMember: async (req, res) => {
    const { _id, users } = req.body; //id is group id and user is ids of new member

    var allusers = JSON.parse(users);

    const addNew = await chatOriginal
      .findByIdAndUpdate(_id, { $push: { users: allusers } }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!addNew) {
      res.send("Cannot add the member");
    } else {
      res.json(addNew);
    }
  },

  RemoveMember: async (req, res) => {
    const { _id, user_id } = req.body; //id is group id and userid is new member id

    const removeOne = await chatOriginal
      .findByIdAndUpdate(_id, { $pull: { users: user_id } }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removeOne) {
      res.send("Cannot remove the member");
    } else {
      res.json(removeOne);
    }
  },
};
