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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const {
    setSocketConnected,
    setNotification,
    setchatList,
    chatList,
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
      const userToken = localStorage.getItem("usertoken");
      setIsLoading(true);

      if (userToken) {

        try {
          //ChatName restore
          const config = {
            headers: {
              authorization: `Bearer ${userToken}`, //throws a token
            },
          };

          const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/api`, config);


          //if new register Display something new page

          // console.log("THis is when to restore the chat in chat.js")

          if (response?.data) {
            setSocketConnected(true);

            //when us connectes enteres to all room which is being cretaed
            response.data.forEach((chat) => {
              const room = chat._id;
              socket.emit("join_room", room);
            });
          }


          // console.log("What is response for token in chat.js", response.status)



          setchatList(response.data);

          localStorage.setItem("UserChatList", JSON.stringify(response.data));

          //if any user is clicked
          const clickUser = JSON.parse(localStorage.getItem("clickedUser"));

          // console.log("This is in Chat.js", clickUser);

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



          //Notification restore
          const storedNotification = JSON.parse(
            localStorage.getItem("newNotification")
          );
          if (storedNotification) setNotification(storedNotification);
        }
        catch (error) {
          if (error.response && error.response.status === 401) {
            // Handle token expiration here
            // console.log('Token expired. Redirect to login or handle appropriately.');
            // Perform actions such as redirecting to login or displaying a message
            localStorage.removeItem("usertoken")
            localStorage.removeItem("userData")
            navigate("/login")
          } else {
            console.error('Error:', error.message);
          }
        }

      }

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    };
    RestoreChat();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [switchDisplay, setSwitchDisplay] = useState(false)
  const shouldDisplayChatList = windowWidth > 900 || !switchDisplay;
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
                  <SearchDrawer setSwitchDisplay={setSwitchDisplay}/>
                  <div className="add-group">
                        <Group setSwitchDisplay={setSwitchDisplay} />
                  </div>
                </div>
                {
                  shouldDisplayChatList && <div className="userchat-list" id="scroll_style">
                    <ChatList switchDisplay={switchDisplay} setSwitchDisplay={setSwitchDisplay} />
                  </div>
                }

              </div>
              <div className="chat-msg">
                <Messenger switchDisplay={switchDisplay} setSwitchDisplay={setSwitchDisplay} />
              </div>
              {
               <div className="user-details">
                  <UserDetails />
                </div>
              }

            </div>
          )}
        </>
      )}
    </StyleChat>
  );
};

export default Chat;
