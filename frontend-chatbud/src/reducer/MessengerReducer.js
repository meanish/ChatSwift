const reducer = (state, action) => {
  switch (action.type) {

    
    case "Restore_Selected_Chat": {
      const { val } = action.payload;
      return {
        ...state,
        selectedChat: val,
      };
    }

    case "SetActiveChat": {
      const { val } = action.payload;
      return {
        ...state,
        selectedChat: val,
      };
    }

    case "Delete_Chat_Member": {
      const { memb } = action.payload;
      if (!state.selectedChat) {
        return state; // No selected chat, return the current state
      }

      const updatedMembers = state.selectedChat.users.filter(
        (user) => user !== memb
      );

      return {
        ...state,
        selectedChat: { ...state.selectedChat, users: updatedMembers },
      };
    }

    //New Member add in group chat
    case "Add_New_Member": {
      const { selectedUser } = action.payload;
      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          users: [...state.selectedChat.users, ...selectedUser],
        },
      };
    }

    //Rename the group
    case "Rename_Group": {
      const { editedText } = action.payload;
      return {
        ...state,
        selectedChat: {
          ...state.selectedChat,
          chatName: editedText,
        },
      };
    }

    case "Send_Message": {
      const { Latestmsg } = action.payload;
      return {
        ...state,
        MessageData: [...state.MessageData, Latestmsg],
      };
    }

    case "Get_Message": {
      const { msg } = action.payload;
      return {
        ...state,
        MessageData: [...msg],
      };
    }
    case "LOGOUT": {
      return {
        selectedChat: "",
        newid: "",
        MessageData: [],
      };
    }
    default:
      return state;
  }
};

export default reducer;
