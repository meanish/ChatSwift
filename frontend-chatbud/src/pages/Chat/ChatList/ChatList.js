import React from "react";
import { GlobalChat } from "../../../context/ChatContext";
import { GlobalMessage } from "../../../context/MessengerContext";
import { ChatListStyle } from "../../../components/ChatStyle/ChatList/ChatListStyle.styled";

const ChatList = () => {
  const { chatList, user, clickUser, setclickUser } = GlobalChat();
  const { GetActiveChat } = GlobalMessage();



  const getChat = ({ val }) => {
    setclickUser(val);
    GetActiveChat({ val });
    localStorage.setItem("clickedUser", JSON.stringify({ ...val }));
  };

  return (
    <ChatListStyle>
      {chatList
        ? chatList.map((val, index) => {
            if (val.isGroupChat) {
              return (
                <p
                  key={index}
                  onClick={() => getChat({ val })}
                  className={`goccia ${
                    clickUser && clickUser._id === val._id ? "active" : ""
                  }`}
                >
                  {val.chatName}
                </p>
              );
            } else {
              return (
                <div key={index}>
                  {val.users
                    .filter((remval) => remval._id !== user._id)
                    .map((remval, index) => (
                      <p
                        key={index}
                        onClick={() => getChat({ val })}
                        className={`goccia ${
                          clickUser && clickUser._id === val._id ? "active" : ""
                        }`}
                      >
                        {remval.firstname}
                      </p>
                    ))}
                </div>
              );
            }
          })
        : {}}
    </ChatListStyle>
  );
};

export default ChatList;
