import axios from "axios";

//not admin msg
export const isSameSender = (MessageData, m, i, userId) => {
  return (
    i < MessageData.length - 1 &&
    (MessageData[i + 1].sender._id !== m.sender._id ||
      MessageData[i + 1].sender._id === undefined) &&
    MessageData[i].sender._id !== userId
  );
};

export const isLastMessage = (MessageData, i, userId) => {
  return (
    i === MessageData.length - 1 && //last msg
    MessageData[MessageData.length - 1].sender._id !== userId && //not admin
    MessageData[MessageData.length - 1].sender._id //msg exits
  );
};

export const GetChat = async (
  user,
  userId, //id of the selected individual
  setchatList,
  RestoreselectedChat,
  setclickUser
) => {

  try {
    const config = {
      headers: {
        authorization: `Bearer ${user?.tokens[0].token}`, //throws a token
      },
    };

    const newChat = await axios.post(`${process.env.REACT_APP_API_URL}/chat/api`, {
      userId
    },
      config
    ); //search for available chat if no create new chat in dB


    const responseChat = await axios.get(`${process.env.REACT_APP_API_URL}/chat/api`, config); //all the chatlist

    localStorage.setItem("userChatList", JSON.stringify(responseChat.data));

    setchatList(responseChat.data); //in provideer place all chat list of the user admnin




    if (newChat.data.length > 0) {
      //onChatlist select chat
      setclickUser(newChat.data[0]);
      RestoreselectedChat({
        val: newChat.data[0],
      });
    } else {//onChatlist select chat
      setclickUser(newChat.data
      );
      RestoreselectedChat({
        val: newChat.data,
      });
    }
  } catch (error) {
    console.error("Failed to search user:", error);
  }
};
