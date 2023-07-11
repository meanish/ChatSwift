require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
require("./src/dB/conn");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const ClientPORT = process.env.ClientPORT; //for socket.io
const auth = require("./middleware/auth");

const ChatRouter = require("./routes/ChatRouter");
const userRegisterRouter = require("./routes/userRegisterRouter");
const userLoginRouter = require("./routes/userLoginRouter");
const userOriginal = require("./src/models/userRegister");
const messageOriginal = require("./src/models/message");
const MessageRouter = require("./routes/MessageRouter");
const SocketUtils = require("./utils/SocketUtil");
const { SearchController } = require("./controllers/SearchController");

app.use(express.json()); //if we get json in return from file express handles in postman
app.use(express.urlencoded({ extended: false })); //not only postman in live server too return json handles
app.use(cookieParser());

app.use("/register", userRegisterRouter);

app.use("/login", userLoginRouter);

// app.use("/chat", ChatRouter)

//searching account with the keyword ignoring the admin
app.get("/search", auth, SearchController);

app.use("/chat", ChatRouter);

app.use("/message", auth, MessageRouter);

// app.use("/logout",auth,LogoutController)

// ..................DEPLOYEMENT......................
const _dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {

  app.use(
    express.static(path.join(_dirname1, "..", "/frontend-chatbud/build"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(_dirname1, "..", "frontend-chatbud", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running sucessfully");
  });
}

// ..................DEPLOYEMENT......................

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log("Port Connected");
});

//Socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000, //wait 60nsec to get res else break conn
  cors: {
    origin: `${ClientPORT}`,
  },
});

// Require the socket.js file and pass the io object to it
require("./socket")(io);
