require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
require("./src/dB/conn");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const auth = require("./middleware/auth");

const ChatRouter = require("./routes/ChatRouter");
const userRegisterRouter = require("./routes/userRegisterRouter");
const userLoginRouter = require("./routes/userLoginRouter");
const userOriginal = require("./src/models/userRegister");
const messageOriginal = require("./src/models/message");
const MessageRouter = require("./routes/MessageRouter");
const SocketUtils = require("./utils/SocketUtil");

app.use(express.json()); //if we get json in return from file express handles in postman
app.use(express.urlencoded({ extended: false })); //not only postman in live server too return json handles
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("home pAge");
});

app.use("/register", userRegisterRouter);

app.use("/login", userLoginRouter);

// app.use("/chat", ChatRouter)

//searching account with the keyword ignoring the admin
app.get("/search", auth, async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");

    const users = await userOriginal.find({
      $or: [
        { firstname: regex },
        { lastname: regex },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstname", " ", "$lastname"] },
              regex,
            },
          },
        }, // Concatenate first name and last name and perform regex search,
      ],
      _id: { $ne: req.user._id }, //req.user contain all doc of a user admin
    });

    res.send(users);
  } catch (e) {
    res.status(401).json("Failed finding keyword");
  }
});

app.use("/chat", auth, ChatRouter);

app.use("/message", auth, MessageRouter);

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log("Port Connected");
});

//Socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000, //wait 60nsec to get res else break conn
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.emit("connected");
  console.log(`Connected with Socket in backend ${socket.id}`); //id for individual users

  // //setting admin
  // socket.on("setup", (userData) => {
  //   socket.join(userData._id); //New room for a individual user
  //   console.log("Admin in the room");
  // });

  //create a new room room:selected._id
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(
      `Selected Chat joiined  socket ${socket.id} and room no. ${room}`
    );
  });

  socket.on("typing", (room) => {
    console.log("Typingloader", room);
    // Exclude the sender's socket ID from the recipients
    const senderSocketId = socket.id;

    const roomSockets = io.sockets.adapter.rooms.get(room);

    const recipients = new Set(roomSockets);
    console.log("Before delete", recipients);
    recipients.delete(senderSocketId);
    console.log(recipients);
    recipients.forEach((recipientSocketId) => {
      socket.in(recipientSocketId).emit("typing");
    });
  });

  socket.on("stop_typing", (room) => {
    // Exclude the sender's socket ID from the recipients
    const senderSocketId = socket.id;
    const roomSockets = io.sockets.adapter.rooms.get(room);
    const recipients = new Set(roomSockets);
    console.log("After Stoping delete", recipients);
    recipients.delete(senderSocketId);
    console.log("Stop", recipients);

    recipients.forEach((recipientSocketId) => {
      socket.in(recipientSocketId).emit("stop_typing");
    });
  });

  socket.on("new_message", (newmsgrreceived) => {
    const recipients = SocketUtils.excludeSenderAndEmitMessage(
      io,
      socket,
      newmsgrreceived
    );

    // Emit the message to the recipients in the room
    recipients.forEach((recipientSocketId) => {
      socket.to(recipientSocketId).emit("message_received", newmsgrreceived);
    });

    // const recipients = Array.from(socket.rooms.get(roomId)).filter(
    //   (socketId) => socketId !== senderSocketId
    // );
    // socket.to(room).emit("message_received", message);
  });

  socket.on("disconnect", () => {
    socket.emit("disconnected"); //loggout false and exit
    console.log("User Dixconnected", socket.id);
  });
});

// //new msg have chat,sender,content, date etc //sender.chat._id is the rooom no.
// console.log("hello user", user._id);
// console.log("sender me", newmsgrreceived.sender._id);
// if (user._id === newmsgrreceived.sender._id)
//   return console.log("Emitting 'message received' event to user", user._id);
// //if the sender is the user no change from socket remaining user ko state ma change garr
// else {
//   console.log(user);
//   socket
//     .to(newmsgrreceived.chat._id)
//     .emit("message_received", newmsgrreceived);
// } //.in means inside user's room and send/emit the msg

// chat.users.forEach((user) => {
//   const noSender = chat.users.filter((val) => {
//     return val._id === newmsgrreceived.sender._id;
//   });
//    if (!noSender.some(noSenderUser => noSenderUser._id === user._id)) {
//   socket
//     .to(newmsgrreceived.chat._id)
//     .emit("message_received", newmsgrreceived);
// });

// socket
//   .to(newmsgrreceived.chat._id)
//   .emit("message_received", newmsgrreceived);
