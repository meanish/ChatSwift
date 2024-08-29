import React, { useState } from "react";
import { GlobalChat } from "../../../context/ChatContext";
import { GlobalMessage } from "../../../context/MessengerContext";
import { ChatListStyle } from "../../../components/ChatStyle/ChatList/ChatListStyle.styled";

const ChatList = ({ switchDisplay, setSwitchDisplay }) => {
  const { chatList, user, clickUser, setclickUser } = GlobalChat();
  const { GetActiveChat } = GlobalMessage();
  const [activeUserId, setActiveUserId] = useState(null);

  const getChat = ({ val }) => {
    setclickUser(val);
    GetActiveChat({ val });
    localStorage.setItem("clickedUser", JSON.stringify({ ...val }));
    setActiveUserId(val._id === activeUserId ? null : val._id); // Toggle active user details
  };


  const clickhandler = (val) => {
    getChat({ val })
    setSwitchDisplay(true)
  }


  return (

    <ChatListStyle>
      <h1 className="head-text">Chat List</h1>
      {chatList
        ? chatList.map((val, index) => {
          if (val.isGroupChat) {
            return (
              <div key={index} className="chat-item">
                <p
                  onClick={() => clickhandler(val)}
                  className={`goccia ${clickUser && clickUser._id === val._id ? "active" : ""}`}
                >
                  {val.chatName}
                </p>
              </div>
            );
          } else {
            return (
              <div key={index} className="chat-item">
                {val.users
                  .filter((remval) => remval._id !== (user._id || user?.userData._id))
                  .map((remval, index) => (
                    <div key={index} className="user-item">
                      <p
                        onClick={() => clickhandler(val)}
                        className={`goccia ${clickUser && clickUser._id === val._id ? "active" : ""}`}
                      >
                        {remval.firstname}
                      </p>
                      {/* {activeUserId === val._id && (
                        <div className="user-details">
                          <p>Email: {remval.email}</p>
                        </div>
                      )} */}
                    </div>
                  ))}
              </div>
            );
          }
        })
        : null}
    </ChatListStyle>
  );
};

export default ChatList;
