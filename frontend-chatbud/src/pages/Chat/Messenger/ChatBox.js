import React from "react";
import { ChatBoxStyle } from "../../../components/ChatStyle/Messenger/ChatBox.styled";


const ChatBox = ({ name, val }) => {
  return (
    <ChatBoxStyle>
      <div className="chat_head">
        <div className="user-name">
          <h1>{name}</h1>
        </div>
      </div>
    </ChatBoxStyle>
  );
};

export default ChatBox;
