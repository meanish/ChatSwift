const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chatbud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connected to the db")
    })
    .catch(() => {
        console.log("eroor");
    })