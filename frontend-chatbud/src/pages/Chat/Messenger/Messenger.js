import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Send, CameraAlt, Image, Mic, ArrowBack } from "@mui/icons-material";
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


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const shouldDisplayChatList = windowWidth > 900 || switchDisplay;

  // console.log("Is the scoket active when messageier", socketConnected)


  //onTyping effect in receiver
  const changeHandler = (e) => {
    setnewMessage(e.target.value);


    // console.log("When writing statrt condition", socketConnected, "In chat troom id", selectedChat._id)
    if (!socketConnected) return;

    socket.emit("typing", selectedChat._id);

    let lastTypingTime = new Date().getTime();

    var timerLength = 3000; //3sec

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength) {
        //means if typing gap is more than 3 sec and still typing then stop
        socket.emit("stop_typing", selectedChat._id);
        setisTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.on("typing", (room) => {
      setcurrRoom(room);
      setisTyping(true);
    }); //when typing go true
    socket.on("stop_typing", () => setisTyping(false)); //when stopped dgo true
  });

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
                      .filter((val) => val._id !== (user._id || user?.userData._id)) //remove admin
                      .map(
                        (
                          val //what lest is receiver
                        ) => (
                          <ChatBox
                            key={val._id}
                            name={val.firstname}
                            val={selectedChat}
                          />
                        )
                      )
                  ) : (
                    <ChatBox name={selectedChat.chatName} val={selectedChat} />
                  )
                ) : (
                  <h1 className="name">No one to chat with</h1>
                )}
              </div>
              <div className="messages">
                {/*  //All Messages */}
                <Messages isTyping={isTyping} />
                <div className="message_field">
                  <TextField
                    type="text"
                    className="input-field"
                    value={newMessage}
                    placeholder="Type your message..."
                    onChange={(e) => changeHandler(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newMessage) {
                        e.preventDefault(); // Prevent form submission
                        SendMessage({ newMessage, selectedChat, setnewMessage });
                        setnewMessage("")

                        socket.emit("stop_typing", selectedChat._id);
                      }
                    }}
                  />
                  <div className="icons-container">

                    <Button variant="contained" color="primary">
                      <Send
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          SendMessage({ newMessage, selectedChat, setnewMessage });
                          setnewMessage("")
                          socket.emit("stop_typing", selectedChat._id);
                        }}
                      />
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


// {/* <CameraAlt />
//               <Image />
//               <Mic /> */}