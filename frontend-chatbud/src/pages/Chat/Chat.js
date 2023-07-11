import React, { useState, useEffect } from "react";
import { GlobalChat } from "../../context/ChatContext";
import ChatList from "./ChatList/ChatList";
import ChatNavbar from "./Navbar/ChatNavbar";
import { useNavigate } from "react-router-dom";
import SearchDrawer from "./ChatList/Search";
import Group from "./ChatList/Group/Group";
import Messenger from "./Messenger/Messenger";
import UserDetails from "./UserDetails/UserDetails";
import { GlobalMessage } from "../../context/MessengerContext";
import socket from "../../config/socket";
import GetStarted from "../Home/GetStarted";
import { StyleChat } from "../../components/ChatStyle.styled";
import Loader from "../../config/oldMessageLoader";
import axios from "axios";

const Chat = () => {
  const { RestoreselectedChat } = GlobalMessage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    setSocketConnected,
    setNotification,
    setchatList,
    chatList,
    user,
    setclickUser,
  } = GlobalChat();

  // Check if user is logged in on component mount 1st time open
  useEffect(() => {
    const UserchatData = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!userData) {
        //socket disconnected here
        navigate("/login"); // If not logged in, redirect to the login page
        return;
      }
    };

    UserchatData();
  }, [navigate]);

  useEffect(() => {
    const RestoreChat = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));

      setIsLoading(true);

      if (userData) {
        //ChatName restore
        const config = {
          headers: {
            authorization: `Bearer ${userData.tokens[0].token}`, //throws a token
          },
        };

        const response = await axios.get("/chat/api", config);

        setchatList(response.data);

        localStorage.setItem("UserChatList", JSON.stringify(response.data));

        //if any user is clicked
        const clickUser = JSON.parse(localStorage.getItem("clickedUser"));
        if (clickUser) setclickUser(clickUser);

        // same chatmessage display on reload
        if (response.data && clickUser)
          RestoreselectedChat({
            val: clickUser,
          });
        //onreload send the selectedchat display msges
        else if (response.data && !clickUser) {
          RestoreselectedChat({ val: response.data[0] });
          setclickUser(response.data[0]);
        }

        //if new register Display something new page
        socket.on("connected", () => {
          if (response.data) {
            setSocketConnected(true);

            //when us connectes enteres to all room which is being cretaed
            response.data.forEach((chat) => {
              const room = chat._id;
              socket.emit("join_room", room);
            });
          }
        });

        //Notification restore
        const storedNotification = JSON.parse(
          localStorage.getItem("newNotification")
        );
        if (storedNotification) setNotification(storedNotification);
      }

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    };
    RestoreChat();
  }, []);

  return (
    <StyleChat>
      {isLoading ? (
        <div className="loader_container">
          <div className="loader">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <ChatNavbar />
          {!chatList.length > 0 ? (
            <GetStarted />
          ) : (
            <div className="chat-root">
              <div className="user-list">
                <div className="create-group">
                  <SearchDrawer />
                  <div className="add-group">
                    <Group />
                  </div>
                </div>
                <div className="userchat-list" id="scroll_style">
                  <ChatList />
                </div>
              </div>
              <div className="chat-msg">
                <Messenger />
              </div>
              <div className="user-details">
                <UserDetails />
              </div>
            </div>
          )}
        </>
      )}
    </StyleChat>
  );
};

export default Chat;
