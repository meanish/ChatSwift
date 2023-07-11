import React, { useEffect, useRef, useState } from "react";
import { MessageStyle } from "../../../components/ChatStyle/Messenger/Message.styled";
import { GlobalMessage } from "../../../context/MessengerContext";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender, isLastMessage } from "../../../config/ChatLogic";
import { GlobalChat } from "../../../context/ChatContext";
import socket from "../../../config/socket";
import Lottie from "react-lottie";
import animationData from "../../../animations/Loader.json";
import Loader from "../../../config/Loader";
import OldLoader from "../../../config/oldMessageLoader";

var selectedChatCompare;

const Messages = ({ isTyping }) => {
  const { MessageData, selectedChat } = GlobalMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(12);
  const [noMoreMessages, setNoMoreMessages] = useState(false);
  const messageListRef = useRef(null);

  const { user, setAllmessages, notification, currroom, setNotification } =
    GlobalChat();
  let userId;

  if (user) {
    userId = user._id;
  }

  //in msgreducer when selectedchat changes stiores msg in MD
  useEffect(() => {
    // Simulated API call to fetch all messages
    setMessages(MessageData);
  }, [MessageData]); //MD gets updated on receiveing sending new messages

  useEffect(() => {
    if (user) {
      socket.emit("join_room", selectedChat._id);
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    //backup for selectedchat
    selectedChatCompare = selectedChat; //suppose to emit or give notification

    //clear notification
    setNotification(
      notification.filter((n) => n.chat._id !== selectedChat._id)
    );

    // Scroll to bottom when a new selected chat is entered
    scrollToBottom();
    return () => {
      clearTimeout(timer);
    };
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message_received", (newmsgrreceived) => {
      //comaprision to ensures that it is a receiver

      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newmsgrreceived.chat._id
      ) {
        //give notification
        if (!notification.includes(newmsgrreceived)) {
          const NotificationList = JSON.parse(
            localStorage.getItem("newNotification")
          );

          setNotification([newmsgrreceived, ...NotificationList]);
        }
      } else {
        setAllmessages(newmsgrreceived); //it triggers to get the new chatlist in reducer from msg context
      }
    });
  }, [socket]);

  const handleScroll = () => {
    if (
      messageListRef.current.scrollTop === 0 &&
      !isLoading &&
      !isLoadingOlderMessages &&
      showMessages < messages.length
    ) {
      setIsLoadingOlderMessages(true);

      setTimeout(() => {
        setShowMessages((prevShowMessages) => {
          const newShowMessages = prevShowMessages + 15;
          return newShowMessages > messages.length
            ? messages.length
            : newShowMessages;
        });
        setIsLoadingOlderMessages(false);
      }, 1000);
    } else if (
      messageListRef.current.scrollTop === 0 &&
      !isLoading &&
      !isLoadingOlderMessages &&
      showMessages >= messages.length
    ) {
      setIsLoadingOlderMessages(false); // Reset isLoadingOlderMessages
      setNoMoreMessages(true);
      setTimeout(() => {
        setNoMoreMessages(false);
      }, 1000);
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  //scroll tobottom on chnages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //for istyping loader

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <MessageStyle>
      {isLoading ? (
        <div className="loader_container">
          <div className="loader">
            <Loader />
          </div>
        </div>
      ) : (
        <ScrollableFeed>
          {isLoadingOlderMessages ? (
            <div className="oldloader_container">
              <div className="old_loader">
                <OldLoader />
              </div>
            </div>
          ) : noMoreMessages ? (
            <div className="oldloader_container">
              <p className="No_more">No More Messages</p>
            </div>
          ) : null}
          <div
            className="message-list"
            ref={messageListRef}
            onScroll={handleScroll}
          >
            <div className="message">
              <div className="center">
                <div className="grid-message">
                  {!messages.length > 0 ? (
                    <div className="New_Message">
                      <p>Let's Begin the Conversation .....</p>
                    </div>
                  ) : (
                    <div
                      className={`${
                        MessageData.sender?._id === userId
                          ? "col-message-received"
                          : "col-message-send"
                      } message-container`}
                    >
                      {messages.slice(-showMessages).map((m, i) => (
                        <div
                          key={m._id}
                          className={`msg_content ${
                            m.sender._id !== userId ? "received" : "sent"
                          }`}
                        >
                          {/* //decisiding where to place the profile pic  */}
                          {(isSameSender(MessageData, m, i, userId) ||
                            isLastMessage(MessageData, i, userId)) && (
                            <p className="sender_profile">{m.sender.email}</p>
                          )}
                          <div className="message">{m.content}</div>
                        </div>
                      ))}

                      <div className="typing">
                        {isTyping && currroom === selectedChat._id ? (
                          <div>
                            <Lottie
                              options={defaultOptions}
                              width={70}
                              style={{ marginBottom: 15, marginLeft: 0 }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollableFeed>
      )}
    </MessageStyle>
  );
};

export default Messages;
