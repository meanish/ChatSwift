import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { Send, ArrowBack } from "@mui/icons-material";
import { StyleMessenger } from "../../../components/ChatStyle/Messenger/Messenger.styled";
import { GlobalMessage } from "../../../context/MessengerContext";
import ChatBox from "./ChatBox";
import Messages from "./Messages";
import { GlobalChat } from "../../../context/ChatContext";
import socket from "../../../config/socket";

const Messenger = ({ switchDisplay, setSwitchDisplay }) => {
  const { selectedChat, SendMessage } = GlobalMessage();
  const [newMessage, setnewMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSending, setIsSending] = useState(false);

  const { socketConnected, setisTyping, isTyping, user, setcurrRoom } =
    GlobalChat();

  // Create a ref for the TextField
  const textFieldRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldDisplayChatList = windowWidth > 900 || switchDisplay;

  const changeHandler = (e) => {
    setnewMessage(e.target.value);

    if (!socketConnected) return;

    socket.emit("typing", selectedChat._id);

    let lastTypingTime = new Date().getTime();

    var timerLength = 3000; // 3 seconds

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength) {
        socket.emit("stop_typing", selectedChat._id);
        setisTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.on("typing", (room) => {
      setcurrRoom(room);
      setisTyping(true);
    });
    socket.on("stop_typing", () => setisTyping(false));
  });

  const handleSendMessage = () => {
    if (newMessage) {
      SendMessage({ newMessage, selectedChat, setnewMessage });
      setnewMessage("");
      socket.emit("stop_typing", selectedChat._id);
      // Focus the TextField after sending the message
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }
  };

  return (
    <StyleMessenger>
      {
        shouldDisplayChatList ? (
          <div className="inside-chat">
            <div className="chatbox">
              <div className="button arrowback" onClick={() => { setSwitchDisplay(false) }}> <ArrowBack /></div>
              <div className="user-name">
                {selectedChat && selectedChat !== "" ? (
                  !selectedChat.isGroupChat ? (
                    selectedChat.users
                      .filter((val) => val._id !== (user._id || user?.userData._id)) // Remove admin
                      .map((val) => (
                        <ChatBox
                          key={val._id}
                          name={val.firstname}
                          val={selectedChat}
                        />
                      ))
                  ) : (
                    <ChatBox name={selectedChat.chatName} val={selectedChat} />
                  )
                ) : (
                  <h1 className="name">No one to chat with</h1>
                )}
              </div>
              <div className="messages">
                {/* All Messages */}
                <Messages isTyping={isTyping} />
                <div className="message_field">
                  <TextField
                    type="text"
                    className="input-field"
                    value={newMessage}
                    placeholder="Type your message..."
                    onChange={(e) => changeHandler(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission
                        handleSendMessage();
                      }
                    }}
                    // Set the ref to the TextField
                    ref={textFieldRef}
                  />
                  <div className="icons-container">
                    <Button variant="contained" color="primary" onClick={handleSendMessage}>
                      <Send />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </StyleMessenger>
  );
};

export default Messenger;
