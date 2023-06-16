const mongoose = require("mongoose")



const MessageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userOriginal"
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatOriginal",
    },
},
    {
        timestamps: true,
    }
)

const messageOriginal = new mongoose.model("messageOriginal", MessageSchema);


module.exports = messageOriginal;
