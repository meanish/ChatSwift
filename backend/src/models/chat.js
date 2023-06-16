const mongoose = require("mongoose")



const ChatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userOriginal",
        }
    ],//no of users single or group

    latestMessage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageOriginal",
    }],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userOriginal",
    },
},
    {
        timestamps: true,
    }
)

const chatOriginal = new mongoose.model("chatOriginal", ChatSchema);


module.exports = chatOriginal;

