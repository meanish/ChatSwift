import { React, createContext, useEffect, useContext, useReducer } from "react";
import reducer from "../reducer/MessengerReducer";
import axios from "axios";
import { GlobalChat } from "./ChatContext";
import socket from "../config/socket";
export const MessageValue = createContext();

const initialState = {
  selectedChat: "",
  newid: "",
  MessageData: [],
};

const MessengerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    user,
    setselectedUser,
    Allmessage,
    setAllmessages,
    setclickUser,
    setchatList,
  } = GlobalChat();

  //to save the chatlist future
  //whenever you change the chat it gets the new chatlIst
  useEffect(() => {
    const saveChat = async () => {
      if (!state.selectedChat) {
        return; // Exit the function if selectedChat is empty
      }

      //setitems
      localStorage.setItem("SelectedChat", JSON.stringify(state.selectedChat));

      //to get message data of the selected chat
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${user.tokens[0].token}`, //throws a token
          },
        };
        const result = await axios.get(
          `message/${state.selectedChat._id}`,
          config
        );
        const msg = await result.data;

        dispatch({ type: "Get_Message", payload: { msg } });
      } catch (e) {
        console.log("error in renaming the chat");
      }
    };
    saveChat();
  }, [state.selectedChat, Allmessage]);

  //restore selectedChat
  const RestoreselectedChat = ({ val }) => {
    dispatch({ type: "Restore_Selected_Chat", payload: { val } });
  };

  const GetActiveChat = async ({ val }) => {
    try {
      dispatch({ type: "SetActiveChat", payload: { val } });
    } catch (error) {
      console.log(error);
    }
  };

  //Delete a member from the group
  const DeleteChatMember = async ({ val: memb }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.tokens[0].token}`, // Assuming user and tokens are defined correctly
        },
      };
      await axios.put(
        `/chat/removeone`,
        {
          _id: state.selectedChat._id,
          user_id: memb._id,
        },
        config
      );
      const response = await axios.get("/chat/api", config);
      localStorage.setItem("UserChatList", JSON.stringify(response.data));
      setchatList(response.data);
      RestoreselectedChat({ val: response.data[0] });
      setclickUser(response.data[0]);
      localStorage.setItem("clickedUser", JSON.stringify(response.data[0]));
      dispatch({ type: "Delete_Chat_Member", payload: { memb } });
    } catch (error) {
      console.log(error);
    }
  };

  const AddChatMember = async ({
    selectedUser,
    selectedChat,
    setKeyword,
    setSearchResults,
  }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.tokens[0].token}`, //throws a token
        },
      };
      await axios.put(
        `chat/addnew`,
        {
          users: JSON.stringify(selectedUser.map((val) => val._id)),
          _id: selectedChat._id,
        },
        config
      );
      const response = await axios.get("/chat/api", config);
      setchatList(response.data);
      dispatch({ type: "Add_New_Member", payload: { selectedUser } });
      setselectedUser([]);
      setSearchResults([]);
      setKeyword("");
    } catch (e) {
      console.log("error in adding a member");
    }
  };

  const RenameGroup = async ({ editedText, selectedChat, setIsEditable }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.tokens[0].token}`, //throws a token
        },
      };
      await axios.put(
        `chat/rename`,
        {
          chatName: editedText,
          _id: selectedChat._id,
        },
        config
      );
      setIsEditable(false);
      dispatch({ type: "Rename_Group", payload: { editedText } });
    } catch (e) {
      console.log("error in renaming the chat");
    }
  };

  //Sending msg
  const SendMessage = async ({
    newMessage: msg, //new input msg
    selectedChat,
    setnewMessage,
  }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.tokens[0].token}`, //throws a token
        },
      };
      const messages = await axios.post(
        `message`,
        {
          content: msg,
          chatId: selectedChat._id,
        },
        config
      );
      const Latestmsg = await messages.data; //all msg detailed array from dB
      setnewMessage("");
      setAllmessages(Latestmsg); //just to get the meesgae updated
      dispatch({ type: "Send_Message", payload: { Latestmsg } });

      socket.emit("new_message", Latestmsg);
    } catch (e) {
      console.log(e);
    }
  };

  //Logout the system resseting all the state to default empty
  const LogOut = () => {
    // Dispatch the "LOGOUT" action to reset the state
    dispatch({ type: "LOGOUT" });
  };
  return (
    <MessageValue.Provider
      value={{
        ...state,
        RestoreselectedChat,
        GetActiveChat,
        DeleteChatMember,
        AddChatMember,
        RenameGroup,
        SendMessage,
        LogOut,
      }}
    >
      {children}
    </MessageValue.Provider>
  );
};

export const GlobalMessage = () => {
  return useContext(MessageValue);
};

export default MessengerProvider;
