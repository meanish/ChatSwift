const mongoose = require("mongoose");

mongoose
  // .connect("mongodb://localhost:27017/chatbud", {
  .connect(`${process.env.MONGODB_URI}`, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "chatbud", // Specify the database name
  })
  .then(() => {
    console.log("connected to the monog db");
  })
  .catch(() => {
    console.log("eroor in mongodB connection");
  });
