import { React, createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import socket from "../config/socket";

export const AllValue = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null); //userDetail
  const [chatList, setchatList] = useState([]); //available chat list
  const [clickUser, setclickUser] = useState(null); //available chat list
  const [searchResults, setSearchResults] = useState([]); //to search a friend
  const [selectedUser, setselectedUser] = useState([]); //mark the friend for grouping
  const [openSnack, setOpenSnack] = useState(false); //for snacks popup
  const [open, setOpen] = useState(false); //snacks funct
  const [socketConnected, setSocketConnected] = useState(false); //for socket connection throughout
  const [isTyping, setisTyping] = useState(false);
  const [currroom, setcurrRoom] = useState(); //for room backup and comapre
  const [Allmessage, setAllmessages] = useState();
  const [notification, setNotification] = useState([]); //seting Notification

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const chatFunction = async () => {
      // Retrieve user details from local storage on component mount
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else if (!storedUser) {
        return;
      }
    };
    chatFunction();
  }, []);

  useEffect(() => {
    localStorage.setItem("newNotification", JSON.stringify(notification));
  }, [notification]);

  const createGroup = async ({ selectedUser, chatName }) => {
    if (!selectedUser.length > 0 || !chatName || selectedUser.length < 2) {
      setOpenSnack(true);
    } else {
      //create a group and set
      try {
        const config = {
          headers: {
            authorization: `Bearer ${user.tokens[0].token}`, //throws a token
          },
        };

        //return a single new document with new users group
        await axios.post(
          `/chat/group`,
          {
            chatName: chatName,
            users: JSON.stringify(selectedUser.map((val) => val._id)),
            isGroupChat: true,
          },
          config
        );
        handleClose();

        const response = await axios.get("/chat/api", config);
        localStorage.setItem("UserChatList", JSON.stringify(response.data));
        setchatList(response.data);

        //when us connectes enteres to all room which is being cretaed
        response.data.forEach((chat) => {
          const room = chat._id;
          socket.emit("join_room", room);
        });
        
        setselectedUser("");
        setSearchResults([]);
      } catch (error) {
        console.error("Failed searching:", error);
      }
    }
  };

  return (
    <AllValue.Provider
      value={{
        user,
        setUser,
        chatList,
        setchatList,
        searchResults,
        setSearchResults,
        selectedUser,
        setselectedUser,
        createGroup,
        openSnack,
        setOpenSnack,
        handleClose,
        handleOpen,
        open,
        setOpen,
        setisTyping,
        isTyping,
        socketConnected,
        setSocketConnected,
        Allmessage,
        setAllmessages,
        notification,
        setNotification,
        clickUser,
        setclickUser,
        currroom,
        setcurrRoom,
      }}
    >
      {children}
    </AllValue.Provider>
  );
};

export const GlobalChat = () => {
  return useContext(AllValue);
};

export default ChatProvider;
